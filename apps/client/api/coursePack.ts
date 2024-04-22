import { http } from "./http";

export interface Course {
  id: number;
  title: string;
}

export interface CoursePack {
  id: number;
  title: string;
}

export interface CoursePack2 {
  id: number;
  title: string;
  courses: Course[];
}

export async function fetchCoursePacks() {
  // return await http.get<CoursePack[], CoursePack[]>("/course-pack");

  return [
    {
      id: 1,
      title: "游客课程",
    },
    {
      id: 2,
      title: "其他课程",
    },
  ];
}

export async function fetchCoursePack(id: number) {
  // return await http.get<CoursePack2, CoursePack2>(`/course-pack/${id}`);

  return {
    id: 1,
    title: "游客课程",
    courses: [
      {
        id: 1,
        title: "Course 1",
      },
      {
        id: 2,
        title: "Course 2",
      },
      {
        id: 3,
        title: "Course 3",
      },
    ],
  };
}
