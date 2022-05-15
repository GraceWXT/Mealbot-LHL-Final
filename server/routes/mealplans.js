const express = require("express");
const router  = express.Router();
const { getRandomRecipesForWeek } = require("../db/queries/recipe-queries");
const mealplanMapper = require("../helpers/mealplan-helper");

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

module.exports = router;
