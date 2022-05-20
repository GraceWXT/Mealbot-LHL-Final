const db = require("../db-connection");

const saveMealPlan = (userId, startDate) => {
  return db.query(`
  INSERT INTO meal_plans (user_id, start_date)
  VALUES (${userId}, '${startDate}')
  RETURNING *;
  `).then((res) => {
    return res.rows[0];
  }).catch((err) => {
    console.log("saveMealPlan error:", err.message);
  });
};

module.exports = { saveMealPlan };
