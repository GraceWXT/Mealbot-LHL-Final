const express = require("express");
const router  = express.Router();

const axios = require("axios");

// db queries and helper functions
const { getRandomRecipesForWeek, getRandomRecipeForSlot } = require("../db/queries/recipe-queries");
const { saveMealPlan } = require("../db/queries/mealplan-queries");
const { getEmptyMealPlan, mealplanMapper, apiMealPlanMapper, getRecipeIds} = require("../helpers/mealplan-helper");

// Convenience variables
const apiBaseUrl = "https://api.spoonacular.com";
const apiKey = process.env.API_KEY;
const apiUserName = process.env.API_USERNAME;
const apiUserHash = process.env.API_USER_HASH;
// const testingMealPlan = require("../db/mock/testing-mealplan");

// Get /mealplans/:startDate - get the existing meal plan or new random meal plan depending on the start date
router.get("/:startDate", (req, res) => {
  const { startDate } = req.params;

  axios.get(`${apiBaseUrl}/mealplanner/${apiUserName}/week/${startDate}?hash=${apiUserHash}&apiKey=${apiKey}`)
    .then(result => {
      // if there's no saved mealplan in the api database
      if (result.data.days.length === 0) {
        // For a future weeek, get random recipes from our pool and send back as meal plan json
        if (Date.parse(startDate) > new Date().setHours(0, 0, 0, 0)) {
          getRandomRecipesForWeek()
            .then((recipes) => {
              const mealplan = mealplanMapper(recipes);
              res.json({ mealplan, status: "New" });
            })
            .catch(err => {
              res
                .status(500)
                .json({ error: err.message });
            });
        } else {
          // For a past week, send back empty mealplan
          const mealplan = getEmptyMealPlan(startDate);
          res.json({mealplan, status: "Saved" });
        }

      } else {
        // If the meal plan exists
        // transform data to the shape we need and send to front end
        const mealplan = apiMealPlanMapper(result.data.days);
        res.json({ mealplan, status: "Saved" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});

// GET mealplans/shuffle/:slot - shuffle
router.post("/shuffle/:id", (req, res) => {
  const oldMealPlan = req.body;
  const recipeToReplace = oldMealPlan.find(meal => meal.value && meal.value.id === Number.parseInt(req.params.id));
  const slot = recipeToReplace.slot;
  const arrayOfExistingRecipeIds = getRecipeIds(oldMealPlan);
  getRandomRecipeForSlot(slot, arrayOfExistingRecipeIds)
    .then(recipe => {
      const mealplan = oldMealPlan.map(meal => {
        return meal === recipeToReplace ?
          {...meal,
            "value":{
              "id": recipe.api_recipe_id,
              "servings": 2,
              "title": recipe.title,
              "image": recipe.img_url
            }} : meal;
      });
      res.json(mealplan);
    })
    .catch(err => {
      return { error: err.message };
    });

});

// POST /mealplans/:startDate - save meal plan to database and api
router.post("/:startDate", (req, res) => {
  const mealplan = req.body.filter(meal => meal.value);
  // console.log(mealplan);

  const userId = Number.parseInt(req.cookies["user_id"]);

  const apiPromise = axios.post(
    `${apiBaseUrl}/mealplanner/${apiUserName}/items?hash=${apiUserHash}&apiKey=${apiKey}`,
    mealplan)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return { error: err.message };
    });

  const dbPromise = saveMealPlan(userId, req.params.startDate);

  Promise.all([apiPromise, dbPromise])
    .then((results) => {
      res.send(results[0]);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
