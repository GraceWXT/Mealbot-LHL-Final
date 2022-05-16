const express = require("express");
const router = express.Router();

const axios = require("axios");

// Helper functions
const getEndDate = require("../helpers/date-helper");

// Convenience variables
const apiBaseUrl = "https://api.spoonacular.com/mealplanner";
const apiKey = process.env.API_KEY;
const apiUserName = process.env.API_USERNAME;
const apiUserHash = process.env.API_USER_HASH;

//GET /grocerylist/:startDate - generate grocery list
router.get("/:startDate", (req, res) => {
  const startDate = req.params.startDate;
  const endDate = getEndDate(startDate);

  axios.post(`${apiBaseUrl}/${apiUserName}/shopping-list/${startDate}/${endDate}?hash=${apiUserHash}&apiKey=${apiKey}`)
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});


module.exports = router;
