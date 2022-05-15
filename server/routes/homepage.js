const express = require("express");
const router  = express.Router();
const { getUserById } = require("../db/queries/user-queries");

router.get("/", (req, res) => {
  res.cookie("user_id", 1);
  getUserById(1)
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
