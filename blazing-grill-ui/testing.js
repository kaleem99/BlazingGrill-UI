// function checkStoreTimes() {
//   let dayOfTheWeek = new Date().getDay();
//   let time = new Date().toLocaleTimeString();
//   if (dayOfTheWeek >= 1 && dayOfTheWeek <= 4) {
//     return time >= "10:00:00 AM" && time <= "7:30:00 PM";
//   } else if (dayOfTheWeek === 5) {
//     return (
//       time >= "10:00:00 AM" &&
//       time <= "12:00:00 PM" &&
//       time >= "1:30:00 PM" &&
//       time <= "8:00:00 PM"
//     );
//   } else if (dayOfTheWeek === 6) {
//     return time >= "9:30:00 AM" && time <= "8:00:00 PM";
//   } else if (dayOfTheWeek === 0) {
//     return time >= "10:00:00 AM" && time <= "5:00:00 PM";
//   }
//   return time;
// }
// let x = checkStoreTimes();
// console.log(x);


