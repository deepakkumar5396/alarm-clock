
const isValidTime = (timeStr) => {
    return /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/.test(timeStr);
  };
  
  const isValidDay = (dayStr) => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return days.includes(dayStr);
  };
  
  module.exports = { isValidTime, isValidDay };
  