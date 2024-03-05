import { http } from "./http";

export interface CompletionCount {
  courseId: number;
  completionCount: number;
}

export async function fetchCompletionCount() {
  return await http.get<CompletionCount[], CompletionCount[]>(
    "/course-history/count"
  );
}
