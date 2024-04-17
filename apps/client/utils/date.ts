export interface Day {
  year: number;
  month: number;
  day: number;
}
export interface Timestamp {
  timestamp: number;
}

export function isTheDay(theDay: Day) {
  const today = getToday();
  return today.year === theDay.year && today.month === theDay.month && today.day == theDay.day;
}

export function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return { year, month, day };
}

export function formatTimestamp({ timestamp }: Timestamp) {
  let date = new Date(timestamp);

  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let hours = date.getHours();
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  // 使用模板字符串格式化日期
  let formattedDate = `${hours}:${minutes} ${ampm} · ${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  return formattedDate;
}

export function formatSecondsToTime(time: number) {
  if (time === 0) return "0秒";

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return (
    (hours ? `${hours}时` : "") + (minutes ? `${minutes}分` : "") + (seconds ? `${seconds}秒` : "")
  );
}
