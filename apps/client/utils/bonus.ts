interface Day {
  year: number
  month: number
  day: number
}

const theLastDayOfTheLunarYear:Day = {
  year: 2024,
  month: 2,
  day: 9
}

const theFirstDayOfTheLunarYear:Day = {
  year: 2024,
  month: 2,
  day: 10
}

function isTheDay(theDay:Day) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return (year === theDay.year) && (month === theDay.month) && (day == theDay.day)
}

export function isTheFirstDayOfLunarYear() {
  return isTheDay(theFirstDayOfTheLunarYear)
}

export function isTheLastDayOfLunarYear() {
  return isTheDay(theLastDayOfTheLunarYear)
}
