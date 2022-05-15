/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router  = express.Router();
const { getUserById, getPantryItemsByUserId } = require("../db/queries/user-queries");

// GET /users/:id => data needed for user profile page
router.get("/:id", (req, res) => {
  const userPromise = getUserById(req.params.id);
  const pantryItemsPromise = getPantryItemsByUserId(req.params.id);
  Promise.all([userPromise, pantryItemsPromise])
    .then(([user, pantryItems]) => {
      res.json([user, pantryItems]);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
