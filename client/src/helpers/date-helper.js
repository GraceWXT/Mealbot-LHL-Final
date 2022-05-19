const getCurrentMondayDate = () => {
  let today = new Date();
  let day = today.getDay() || 7; // Get current day number, converting Sun. to 7
  if (day !== 1) {               // Only manipulate the date if it isn't Mon.
    today.setHours(-24 * (day - 1)); // Set the hours to day number minus 1 multiplied by negative 24
  }
  return today.toISOString().split("T")[0];
};

/** A function that returns the timestamp of the next Monday in seconds */
const getNextMondayDate = () => {
  const day = new Date();
  const nextMondayInMillSec = day.setDate(
    day.getDate() + (((1 + 7 - day.getDay()) % 7) || 7)
  );
  const nextMondayInMiliSec = new Date(nextMondayInMillSec).setHours(0, 0, 0, 0);
  const nextMondayDate = new Date(nextMondayInMiliSec).toISOString().split("T")[0];
  return nextMondayDate;
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

const getFormatedDates = (yyyymmdd) => {
  const utcTimestamp = Date.parse(yyyymmdd);
  const localTimestamp = utcTimestamp + new Date().getTimezoneOffset() * 60 * 1000;
  const monday =  new Date(localTimestamp).toLocaleString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).split(",")[0];
  const sunday = new Date(localTimestamp + 6 * 24 * 60 * 60 * 1000).toLocaleString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).split(",")[0];

  return { monday, sunday };
};

const getPreviousMonday = (startDate) => {
  const utcTimestamp = Date.parse(startDate);
  const localTimestamp = utcTimestamp + new Date().getTimezoneOffset() * 60 * 1000;
  const previousMonday =  new Date(localTimestamp - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  return previousMonday;
};

const getNextMonday = (startDate) => {
  const utcTimestamp = Date.parse(startDate);
  const localTimestamp = utcTimestamp + new Date().getTimezoneOffset() * 60 * 1000;
  const nextMonday =  new Date(localTimestamp + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  return nextMonday;
};

// console.log(formatDate("2022-05-16"));

export {getCurrentMondayDate, getNextMondayDate, getEndDate, getFormatedDates, getPreviousMonday, getNextMonday};
