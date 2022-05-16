const express = require("express");
const router  = express.Router();

const axios = require("axios");

// db queries and helper functions
const { getUserById } = require("../db/queries/user-queries");
const { getRandomRecipesForWeek } = require("../db/queries/recipe-queries");
const { saveMealPlan } = require("../db/queries/mealplan-queries");
const mealplanMapper = require("../helpers/mealplan-helper");

// Convenience variables
const apiBaseUrl = "https://api.spoonacular.com";
const apiKey = process.env.API_KEY;
const testUserName = process.env.TEST_USERNAME;
const testUserHash = process.env.TEST_USERHASH;
const testingMealPlan = require("../db/mock/testing-mealplan");

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
  // console.log("mealplan in req.body:", mealplan);

  const userId = Number.parseInt(req.cookies["user_id"]);

  const apiPromise = getUserById(userId).then((user) => {
    const { api_username, api_user_hash } = user;
    // sending request with test user and testing meal plan
    return axios.post(
      `${apiBaseUrl}/mealplanner/${testUserName}/items?hash=${testUserHash}&apiKey=${apiKey}`,
      testingMealPlan)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        return { error: err.message };
      });

    // The actual request to send for real meal plan and user:
    // return axios.post(
    //   `${apiBaseUrl}/mealplanner/${api_username}/items?hash=${api_user_hash}&apiKey=${apiKey}`,
    //   mealplan)
    //   .then(res => {
    //     return res.data;
    //   })
    //   .catch(err => {
    //     return { error: err.message };
    //   });
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
