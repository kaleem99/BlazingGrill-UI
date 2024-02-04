function formatDateAndTime() {
  // Get the current date and time
  const currentDate = new Date();

  // Format the date as "DD-MM-YYYY"
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  // Format the time as "HH:mmA"
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedTime = `${hours % 12 || 12}:${minutes}${ampm}`;

  // Output the formatted date and time
  return [`Date: ${formattedDate}`, `Time: ${formattedTime}`];
}

export { formatDateAndTime };
