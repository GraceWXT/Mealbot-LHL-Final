//get ingredients information
const getIngredients = (recipe) => {
  let ingredients = [];
  recipe.extendedIngredients.map(ingredient =>  {
    ingredients.push({
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit
    });
  });
  return ingredients;
};

//get instructions information
const getInstructions = (recipe) => {
  let instructions = [];
  recipe.analyzedInstructions[0].steps.map(instruction => {
    instructions.push({
      number: instruction.number,
      step: instruction.step
    });
  });
  return instructions;
};


//get nutrition information
const getNutrition = (recipe) => {
  let nutritionalInfo = [];
  const nutrition = recipe.nutrition.nutrients;

  nutrition.map(nutrient => {
    if (nutrient.name === "Calories" || nutrient.name === "Fat" || nutrient.name === "Carbohydrates" || nutrient.name === "Protein") {
      nutritionalInfo.push({
        name: nutrient.name,
        amount: nutrient.amount,
        unit: nutrient.unit
      });
    }
  });

  return nutritionalInfo;
};

/** A function that cleans the recipe info, returning an object with
 * ingredients, instructions, and nutrition (calories + macronutrients)*/
const getRecipeInfo = (recipe) => {
  const cleanedRecipe = {
    "ingredients": getIngredients(recipe),
    "instructions": getInstructions(recipe),
    "nutrition": getNutrition(recipe),
    "title": recipe.title,
    "readyInMinutes": recipe.readyInMinutes,
    "image": recipe.image,
    "defaultServing": recipe.servings
  };

  return cleanedRecipe;
};

module.exports = getRecipeInfo;
