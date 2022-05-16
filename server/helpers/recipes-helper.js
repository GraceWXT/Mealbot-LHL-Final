/*a function that cleans the recipe info, returning an object with ingredients, instructions, and nutrition
(calories + macronutrients)*/
const getRecipeInfo = (recipe, nutrition) => {
  let cleanedRecipe = {};

  const getIngredients = (recipe,) => {
    let ingredients = []
    recipe.extendedIngredients.map(ingredient =>  {
      ingredients.push({
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit
      })
    })
    return ingredients;
  };

  cleanedRecipe["ingredients"] = getIngredients(recipe);
  cleanedRecipe["instructions"] = recipe.instructions;
  cleanedRecipe["nutrition"] = nutrition

  return cleanedRecipe;

};

module.exports = getRecipeInfo;
