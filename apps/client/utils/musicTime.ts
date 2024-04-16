export function srtTimeToSeconds(srtTime: string) {
  const timeParts = srtTime.split(":");
  const minutes = parseInt(timeParts[0], 10);
  const secondsAndMilliseconds = timeParts[1].split(".");
  const seconds = parseInt(secondsAndMilliseconds[0], 10);
  const milliseconds = parseInt(secondsAndMilliseconds[1], 10);
  return minutes * 60 + seconds + milliseconds / 1000;
}
