import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./components/App";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import MealPlan from "./components/MealPlan";
import Recipe from "./components/Recipe";
import GroceryList from "./components/GroceryList";

import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="users/:id" element={<Profile />} />
          <Route path="mealplan/random" element={<MealPlan />} />
          <Route path="recipe/:id" element={<Recipe />} />
          <Route path="grocerylist/:startDate" element={<GroceryList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
