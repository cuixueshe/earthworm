export function srtTimeToSeconds(srtTime: string) {
  const timeParts = srtTime.split(":");
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  const secondsAndMilliseconds = timeParts[2].split(",");
  const seconds = parseInt(secondsAndMilliseconds[0], 10);
  const milliseconds = parseInt(secondsAndMilliseconds[1], 10);

  return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
}
