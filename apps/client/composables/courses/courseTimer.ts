// CourseTimer.js
type Timestamp = {
  s: number;
  e: number;
  time: number;
};

type Timestamps = Record<string, Timestamp>;

let timestamps: Timestamps = {};

function time(label: string) {
  if (timestamps[label]) return;

  timestamps[label] = {
    s: Date.now(),
    e: 0,
    time: 0,
  };
}

function timeEnd(label: string) {
  const start = timestamps[label].s;
  const end = Date.now();
  const time = (Date.now() - start) / 1000;

  timestamps[label].e = end;
  timestamps[label].time = time;
}

function calculateTotalTime() {
  const totalTime = Object.keys(timestamps).reduce((totalTime, key) => {
    const { time } = timestamps[key];
    return (totalTime += time);
  }, 0);

  return Math.ceil(totalTime);
}

function totalRecordNumber() {
  return Object.keys(timestamps).length;
}

function reset() {
  timestamps = {};
}

export const courseTimer = {
  time,
  timeEnd,
  calculateTotalTime,
  totalRecordNumber,
  reset,
};
