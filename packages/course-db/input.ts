import fs from "fs";
import path from "path";

export function readInputCoursePack() {
  return fs.readFileSync(path.join(process.cwd(), "./data/course-pack.json"), "utf-8");
}
