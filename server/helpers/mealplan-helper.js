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

const apiMealPlanMapper = (days) => {
  let mealplan = [];
  // for 7 days (getDay() = 0 - 6) => Sun - Sat
  // find if day exists
  for (let d = 0; d <= 6; d++) {
    console.log("d:", d);
    if (days.find(day => new Date(day.date * 1000).getUTCDay() === d)) {
      const day = days.find(day => new Date(day.date * 1000).getUTCDay() === d);
      console.log(`day found: matching day = ${d} `, day);

      for (let i = 1; i <= 3; i++) {
        // if day.items.slot === 1 exists, push meal with recipe
        // otherwise empty meal to mealplan
        // repeat for 3 slots
        if (day.items.find(item => item.slot === i)) {
          const item = day.items.find(item => item.slot === i);
          mealplan.push({
            "date": day.date + 420 * 60,
            "slot": item.slot,
            "position": 0,
            "type": "RECIPE",
            "value":{
              "id": item.value.id,
              "servings": 2,
              "title": item.value.title,
              "image": `https://spoonacular.com/recipeImages/${item.value.id}-312x231.jpg`
            }
          });
        } else {
          mealplan.push({
            "date": day.date + 420 * 60,
            "slot": i,
            "position": 0,
            "type": "RECIPE",
            "value":null
          });
        }
      }

    } else {
      console.log("day doesn't exist", d);
      // if day doesn't exist in api meal plan
      // push a whole empty day (3 slots) into mealplan
      for (let i = 1; i <= 3; i ++) {
        const knownDay = new Date(days[0].date * 1000);
        const dateDifference = d === 0 ? (7  - knownDay.getUTCDay()) : (d  - knownDay.getUTCDay());
        let missingDay = knownDay.setDate(knownDay.getUTCDate() + dateDifference) / 1000;
        missingDay = new Date(missingDay * 1000).setHours(0, 0, 0, 0) / 1000;
        console.log("Missing Date: ", missingDay, new Date(missingDay * 1000));
        mealplan.push({
          "date": missingDay,
          "slot": i,
          "position": 0,
          "type": "RECIPE",
          "value":null
        });
      }
    }
  }

  //   if day.items.slot === 2 exists, push meal : empty meal to mealplan
  //   if day.items.slot === 3 exists, push meal : empty meal to mealplan
  // if day does not exist, push 3 empty meals to meal plan

  return mealplan;
};

const getEmptyMealPlan = (startDate) => {
  let mealplan = [];
  const utcTimestamp = Date.parse(startDate);
  const localTimestamp = (utcTimestamp + new Date().getTimezoneOffset() * 60 * 1000) / 1000;
  for (let i = 0; i <= 6; i++) {
    let date = localTimestamp + i * 24 * 60 * 60;
    for (let slot = 1; slot <= 3; slot++) {
      mealplan.push({
        "date": date,
        "slot": slot,
        "position": 0,
        "type": "RECIPE",
        "value": null
      });
    }
  }
  return mealplan;
};

module.exports = { mealplanMapper, apiMealPlanMapper, getEmptyMealPlan};
