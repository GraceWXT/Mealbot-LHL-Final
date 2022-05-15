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

module.exports = { getUserById };
