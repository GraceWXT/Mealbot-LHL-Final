const getCurrentMondayDate = () => {
  let today = new Date();
  let day = today.getDay() || 7; // Get current day number, converting Sun. to 7
  if (day !== 1) {               // Only manipulate the date if it isn't Mon.
    today.setHours(-24 * (day - 1)); // Set the hours to day number minus 1 multiplied by negative 24
  }
  return today.toISOString().split("T")[0];
};

/** A function that returns the timestamp of the next Monday in seconds */
const getNextMondaySec = () => {
  const day = new Date();
  const nextMondayInMillSec = day.setDate(
    day.getDate() + (((1 + 7 - day.getDay()) % 7) || 7)
  );
  const nextMondayInSec = new Date(nextMondayInMillSec).setHours(0, 0, 0, 0) / 1000;
  return nextMondayInSec;
};

// console.log("getNextMondaySec", getNextMondaySec());

/** Given a Monday timestamp, returns the MMM DD, YYYY format Sunday */
const getEndDate = (startDate) => {
  const endDate = new Date(startDate * 1000);
  endDate.setDate(endDate.getDate() + 6);  // getDate grabs the day
  return endDate.toLocaleString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });   // converts date to string
};

// console.log("getEndDate", getEndDate(getNextMondaySec()));

export {getCurrentMondayDate, getNextMondaySec, getEndDate};
