import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./components/App";
import HomePage from "./components/HomePage";
import Profile from "./components/UserProfile/Profile";
import MealPlan from "./components/MealPlan/MealPlan";
import Recipe from "./components/Recipe/Recipe";
import GroceryList from "./components/GroceryList/GroceryList";

import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="users/:id" element={<Profile />} />
          <Route path="mealplan/:startDate" element={<MealPlan />} />
          <Route path="recipes/:id" element={<Recipe />} />
          <Route path="grocerylist/:startDate" element={<GroceryList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
