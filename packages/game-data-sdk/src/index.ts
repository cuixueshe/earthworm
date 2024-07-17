import { setupDB } from "./db";

export * from "./course-pack/course-pack.model";
export * from "./course-pack/course-pack.service";
export * from "./membership/membership.service";

interface Options {
  dataBaseURL: string;
}
export function setupGameDataSDK(options: Options) {
  setupDB(options.dataBaseURL);
}
