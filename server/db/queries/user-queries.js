const db = require("../db-connection");

const getUserById = (id) => {
  return db.query(`
  SELECT *
  FROM users
  WHERE id = ${id};
  `)
    .then((result) => {
      const user = result.rows[0];
      return user;
    })
    .catch((err) => {
      console.log("getUserById error: ", err.message);
    });
};

const getPantryItemsByUserId = (id) => {
  return db.query(`
  SELECT *
  FROM pantry_items
  WHERE user_id = ${id};
  `)
    .then((result) => {
      const pantryItems = result.rows;
      return pantryItems;
    })
    .catch((err) => {
      console.log("getPantryItemsByUserId error: ", err.message);
    });
};

module.exports = { getUserById, getPantryItemsByUserId };
