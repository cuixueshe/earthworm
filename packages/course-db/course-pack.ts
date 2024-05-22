export interface CoursePack {
  title: string;
  description: string;
  courses: Course[];
}

export interface Course {
  title: string;
  description: string;
  statements: Statement[];
}

export interface Statement {
  chinese: string;
  english: string;
  phonetic: string;
}

export function createCoursePack(rawJSON: string) {
  const coursePack = JSON.parse(rawJSON);
  return coursePack as CoursePack;
}
