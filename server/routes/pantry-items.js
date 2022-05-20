/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router  = express.Router();
const { getPantryItemsByUserId } = require("../db/queries/user-queries");

// GET /pantryitems/
router.get("/", (req, res) => {
  const userId = 1;
  getPantryItemsByUserId(userId)
    .then((pantryItems) => {
      res.json(pantryItems);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
