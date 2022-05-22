import filter from "../components/GroceryList/filter";

/** A funciton that takes an array of aisles,
 * filter out the unwanted ones and sort alphabetically */
const groceryListProcessor = (data) => {
  return data.filter(aisle => !filter.includes(aisle["aisle"]))
    .sort((aisle1, aisle2) => {
      const letter1 = aisle1.aisle.charAt(0).toUpperCase();
      const letter2 = aisle2.aisle.charAt(0).toUpperCase();
      if (letter1 < letter2) return -1;
      else if (letter1 > letter2) return 1;
      else return 0;
    });
};

export default groceryListProcessor;
