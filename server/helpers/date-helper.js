/** A function that returns the timestamp of the next Monday in seconds */
const getNextMonday = () => {
  const day = new Date();
  const nextMondayInMillSec = day.setDate(
    day.getDate() + (((1 + 7 - day.getDay()) % 7) || 7)
  );
  const nextMondayInSec = new Date(nextMondayInMillSec).setHours(0, 0, 0, 0) / 1000;
  return nextMondayInSec;
};

// A function that calculates the endDate

const getEndDate = (startDate) => {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);  // getDate grabs the day
  return endDate.toISOString().substring(0,10);   // converts date to string
};

module.exports = { getNextMonday, getEndDate };
