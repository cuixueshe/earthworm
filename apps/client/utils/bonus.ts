import { isTheDay, type Day } from './date';
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


export function isTheFirstDayOfLunarYear() {
  return isTheDay(theFirstDayOfTheLunarYear)
}

export function isTheLastDayOfLunarYear() {
  return isTheDay(theLastDayOfTheLunarYear)
}
