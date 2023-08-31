const getDateAndTime = () => {
  // Get the current date and time
  const currentDate = new Date();

  // Format the date as "YYYY-MM-DD"
  const formattedDate = currentDate.toISOString().substr(0, 10);

  // Format the time as "HH:MM"
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return { formattedDate, formattedTime };
};

export default getDateAndTime;
