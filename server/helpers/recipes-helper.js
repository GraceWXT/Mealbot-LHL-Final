/*a function that cleans the recipe info, returning an object with ingredients, instructions, and nutrition
(calories + macronutrients)*/
const getRecipeInfo = (recipe) => {
  let cleanedRecipe = {};

  const getIngredients = (recipe) => {
    let ingredients = [];
    recipe.extendedIngredients.map(ingredient =>  {
      ingredients.push({
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit
      })
    })
    return ingredients;
  };

  const getNutrition = (recipe) => {
    let nutritionalInfo = [];
    const nutrition = recipe.nutrition.nutrients

    nutrition.map(nutrient => {
      if (nutrient.name === "Calories" || nutrient.name === "Fat" || nutrient.name === "Carbohydrates" || nutrient.name === "Protein"){
        nutritionalInfo.push({
          name: nutrient.name,
          amount: nutrient.amount,
          unit: nutrient.unit
        })
      }
    })

    return nutritionalInfo
  }

  cleanedRecipe["ingredients"] = getIngredients(recipe);
  cleanedRecipe["instructions"] = recipe.instructions;
  cleanedRecipe["nutrition"] = getNutrition(recipe);

  return cleanedRecipe;

};

module.exports = getRecipeInfo;
