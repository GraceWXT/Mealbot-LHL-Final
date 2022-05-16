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
const getEndDate = (start_date) => {
  const end_date = new Date(start_date);
  end_date.setDate(end_date.getDate() + 6)  // getDate grabs the day
  return end_date.toISOString().substring(0,10)   // converts date to string
}

module.exports = { getNextMonday, getEndDate };
