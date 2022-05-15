/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router  = express.Router();
const { getUserById } = require("../db/queries/user-queries");

// GET /users/:id
router.get("/:id", (req, res) => {
  getUserById(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
