import Dexie, { type Table } from "dexie";

export interface CourseDB {
  id?: number;
  courseId: number;
  startAt: number;
  endAt: number;
  time: number;
}

function getDiffTime(startAt: number, endAt: number, lastDiff: number) {
  const diffInSeconds =
    startAt && endAt ? Math.floor((endAt - startAt) / 1000) : 0;
  const totalDiffInSeconds = lastDiff + diffInSeconds;
  return totalDiffInSeconds;
}

export class earthwormDB extends Dexie {
  course!: Table<CourseDB>;

  constructor() {
    super("earthworm");
    this.version(1).stores({
      course: "++id, courseId, startAt, endAt, time",
    });
  }

  async queryCourse(courseId: number) {
    const res = await this.course.where("courseId").equals(courseId).toArray();
    return res[0];
  }

  async addCourse(params: CourseDB) {
    await this.course.add(params);
  }

  async updateCourseTime(params: CourseDB) {
    const { id, startAt, endAt, time } = params;
    await this.course.update(id!, {
      time: getDiffTime(startAt, endAt, time),
    });
  }

  async updateCourse(params: CourseDB) {
    const { id, startAt, endAt } = params;
    await this.course.update(id!, {
      startAt,
      endAt,
    });
    if (startAt && endAt >= startAt) {
      await this.updateCourseTime(params);
    }
  }

  async deleteCourse(courseId: number) {
    const { id } = await this.queryCourse(courseId);
    if (id) await this.course.delete(id);
  }
}

export const db = new earthwormDB();
