const express = require("express");
const router  = express.Router();

const axios = require("axios");


// Convenience variables
const apiBaseUrl = "https://api.spoonacular.com";
const apiKey = process.env.API_KEY;

//helpers
const getRecipeInfo = require("../helpers/recipes-helper");

// GET /recipes/:id - get specific recipe info based on :id
router.get("/:id", (req, res) => {
  const recipeId = req.params.id;
  console.log('recipeid', recipeId);

  const recipeInformation = axios.get(
    `${apiBaseUrl}/recipes/${recipeId}/information?apiKey=${apiKey}`);
  const nutritionInformation = axios.get(
    `${apiBaseUrl}recipes/${recipeId}/nutritionWidget.json?apiKey=${apiKey}`);
    Promise.all([recipeInformation, nutritionInformation])
    .then(([recipeResponse, nutritionResponse]) => {
      const nutrition = getNutritionInfo(nutritionResponse.data)
      const recipe = getRecipeInfo(recipeResponse.data, nutrition);
      res.json(recipe);
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });

});

module.exports = router
