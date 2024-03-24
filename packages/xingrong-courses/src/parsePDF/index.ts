import fs from "fs";
import path from "path";
import pdf from "pdf-parse";
import { inquire } from "./inquire";
import { parse } from "./parser";

const targetPath = path.resolve(__dirname, "../../data/pdf");
const outputPath = path.resolve(__dirname, "../../data/courses");

(async function () {
  const fileNameMap = createFileNameMap();
  const pdfPaths = await inquire(targetPath);

  for (const pdfPath of pdfPaths) {
    let dataBuffer = fs.readFileSync(pdfPath);
    const rawPDFData = await pdf(dataBuffer);
    const result = parse(rawPDFData.text);
    const fileName = fileNameMap[pdfPath];
    save(JSON.stringify(result), fileName);
  }
})();

function save(content: string, fileName: string) {
  const filePath = path.resolve(outputPath, `${fileName}.json`);
  fs.writeFileSync(filePath, content);
}

function createFileNameMap(): Record<string, string> {
  const fileNameMap: Record<string, string> = {};
  const files = fs.readdirSync(targetPath);
  files.sort((a, b) => parseFloat(a) - parseFloat(b));

  files.forEach((file, index) => {
    const key = path.resolve(targetPath, file);
    const nameIndex = index + 1;
    fileNameMap[key] = nameIndex < 10 ? `0${nameIndex}` : `${nameIndex}`;
  });

  return fileNameMap;
}
