// load .env data into process.env
require("dotenv").config();

// Web server config
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 8080;
const app = express();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

// Separated Routes for each Resource
const usersRouter = require("./routes/users");
const homepageRouter = require("./routes/homepage");
const mealPlansRouter = require("./routes/mealplans");
const groceryListRouter = require("./routes/grocery-list");
const recipesRouter = require("./routes/recipes");


// Mount all resource routes
app.use("/users", usersRouter);
app.use("/", homepageRouter);
app.use("/mealplans", mealPlansRouter);
app.use("/grocerylist", groceryListRouter);
app.use("/recipes", recipesRouter);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
