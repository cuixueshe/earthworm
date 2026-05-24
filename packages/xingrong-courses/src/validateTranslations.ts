import fs from "node:fs";
import path from "node:path";

const coursesDir = path.resolve(__dirname, "../data/courses");
const chineseRegex = /[一-鿿]/;
const files = fs.readdirSync(coursesDir).filter((f) => f.endsWith(".json"));

let errors = 0;
let totalEntries = 0;

for (const file of files) {
  const filePath = path.join(coursesDir, file);
  const content = fs.readFileSync(filePath, "utf-8");

  let data: any[];
  try {
    data = JSON.parse(content);
  } catch {
    console.error(`FAIL ${file}: invalid JSON`);
    errors++;
    continue;
  }

  if (!Array.isArray(data)) {
    console.error(`FAIL ${file}: not an array`);
    errors++;
    continue;
  }

  totalEntries += data.length;

  for (let i = 0; i < data.length; i++) {
    const entry = data[i];

    if (!("nativeText" in entry)) {
      console.error(`FAIL ${file}[${i}]: missing "nativeText" key`);
      errors++;
      continue;
    }

    if ("chinese" in entry) {
      console.error(`FAIL ${file}[${i}]: still has "chinese" key`);
      errors++;
    }

    if (!entry.nativeText || entry.nativeText.trim() === "") {
      console.error(`FAIL ${file}[${i}]: empty "nativeText"`);
      errors++;
    }

    if (chineseRegex.test(entry.nativeText)) {
      console.error(`FAIL ${file}[${i}]: Chinese characters in nativeText: "${entry.nativeText}"`);
      errors++;
    }

    if (!entry.english || !entry.soundmark) {
      console.error(`FAIL ${file}[${i}]: missing "english" or "soundmark"`);
      errors++;
    }
  }
}

console.log(`\n${files.length} files, ${totalEntries} entries checked`);

if (errors > 0) {
  console.error(`\nFAILED: ${errors} errors found`);
  process.exit(1);
} else {
  console.log("\nPASSED: all validations OK");
}
