const express = require("express");
const router  = express.Router();

const axios = require("axios");

// db queries and helper functions
const { getRandomRecipesForWeek } = require("../db/queries/recipe-queries");
const { saveMealPlan } = require("../db/queries/mealplan-queries");
const mealplanMapper = require("../helpers/mealplan-helper");

// Convenience variables
const apiBaseUrl = "https://api.spoonacular.com";
const apiKey = process.env.API_KEY;
const apiUserName = process.env.API_USERNAME;
const apiUserHash = process.env.API_USER_HASH;
// const testingMealPlan = require("../db/mock/testing-mealplan");

// GET /mealplans/random - get random meal plan for a week
router.get("/random", (req, res) => {
  getRandomRecipesForWeek()
    .then((recipes) => {
      const mealplan = mealplanMapper(recipes);
      res.json(mealplan);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// POST /mealplans/:startDate - save meal plan to database and api
router.post("/:startDate", (req, res) => {
  console.log("req.params.startDate", req.params.startDate, " type:", typeof req.params.startDate);
  const mealplan = req.body;

  const userId = Number.parseInt(req.cookies["user_id"]);

  const apiPromise = axios.post(
    `${apiBaseUrl}/mealplanner/${apiUserName}/items?hash=${apiUserHash}&apiKey=${apiKey}`,
    mealplan)  //sending actual meal plan from req.body
    // testingMealPlan)  //sending testing meal plan start date 2020-05-18
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return { error: err.message };
    });

  const dbPromise = saveMealPlan(userId, req.params.startDate);

  Promise.all([apiPromise, dbPromise])
    .then((results) => {
      res.send(results);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
