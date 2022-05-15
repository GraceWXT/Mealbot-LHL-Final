/** A function that returns the timestamp of the next Monday */
const getNextMonday = () => {
  const day = new Date();
  const nextMonday = day.setDate(
    day.getDate() + (((1 + 7 - day.getDay()) % 7) || 7)
  );
  return nextMonday;
};

module.exports = getNextMonday;
