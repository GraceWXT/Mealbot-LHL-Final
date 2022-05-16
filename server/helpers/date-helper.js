/** A function that returns the timestamp of the next Monday in seconds */
const getNextMonday = () => {
  const day = new Date();
  const nextMondayInMillSec = day.setDate(
    day.getDate() + (((1 + 7 - day.getDay()) % 7) || 7)
  );
  const nextMondayInSec = new Date(nextMondayInMillSec).setHours(0, 0, 0, 0) / 1000;
  return nextMondayInSec;
};

module.exports = getNextMonday;
