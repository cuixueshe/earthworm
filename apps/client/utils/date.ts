export interface Day {
  year: number
  month: number
  day: number
}

export function isTheDay(theDay:Day) {
  const today = getToday()
  return (today.year === theDay.year) && (today.month === theDay.month) && (today.day == theDay.day)
}

export function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return {year, month, day}
}
