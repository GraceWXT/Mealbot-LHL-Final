const express = require("express");
const router  = express.Router();

const axios = require("axios");


// Convenience variables
const apiBaseUrl = "https://api.spoonacular.com";
const apiKey = process.env.API_KEY;


// GET /recipes/:id - get specific recipe info based on :id
router.get("/:id", (req, res) => {
  const recipeId = req.params.id;
  console.log('recipeid', recipeId);
  axios.get(
    `${apiBaseUrl}/recipes/${recipeId}/information?apiKey=${apiKey}`)
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });

});

module.exports = router
