const { getNextMonday } = require("./date-helper");

const mealConstructor = (recipe, i) => {
  const meal = {
    "date": getNextMonday() + i * 24 * 60 * 60,
    "slot": recipe.slot,
    "position": 0,
    "type": "RECIPE",
    "value":{
      "id": recipe.api_recipe_id,
      "servings": 2,
      "title": recipe.title,
      "image": recipe.img_url
    }
  };
  return meal;
};

const mealplanMapper = (recipes) => {
  const [breakfastRecipes, lunchRecipes, dinnerRecipes] = recipes;

  let mealplan = [];
  for (let i = 0; i <= 6; i++) {
    const breakfast = mealConstructor(breakfastRecipes[i], i);
    const lunch = mealConstructor(lunchRecipes[i], i);
    const dinner = mealConstructor(dinnerRecipes[i], i);
    mealplan.push(breakfast, lunch, dinner);
  }

  return mealplan;
};

module.exports = mealplanMapper;
