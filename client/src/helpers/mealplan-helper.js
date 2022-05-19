const mealPlanSorter = (mealplan, slot) => {
  return mealplan.filter(meal => meal.slot === slot)
    .sort((meal1, meal2) => meal1.date - meal2.date);
};

const headerTextHelper = (slot) => {
  switch (slot) {
  case 1:
    return "Breakfast";
  case 2:
    return "Lunch";
  case 3:
    return "Dinner";
  default:
    break;
  }
};

export { mealPlanSorter, headerTextHelper };
