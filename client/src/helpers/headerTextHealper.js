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

export default headerTextHelper;
