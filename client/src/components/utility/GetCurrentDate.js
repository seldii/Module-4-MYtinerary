export function getCurrentDate(
  separator = "-",
  separatorTwo = " ",
  separatorThree = ":"
) {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let hours = newDate.getHours(); //Current Hours
  let min = newDate.getMinutes(); //Current Minutes
  let sec = newDate.getSeconds(); //Current Seconds

  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date}${separatorTwo}${hours}${separatorThree}${min}${separatorThree}${sec}`;
}
