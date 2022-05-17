const mealPlanSorter = (mealplan, slot) => {
  return mealplan.filter(meal => meal.slot === slot)
    .sort((meal1, meal2) => meal1.date < meal2.date);
};

export default mealPlanSorter;
