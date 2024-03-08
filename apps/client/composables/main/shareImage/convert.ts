export function convertTitleToNumber(title: string): string {
  title = title.replace(/第|课/g, "");

  const numMap = {
    一: 1,
    二: 2,
    三: 3,
    四: 4,
    五: 5,
    六: 6,
    七: 7,
    八: 8,
    九: 9,
  };

  const parts = title.split(".");

  let result = parts.map((part) => {
    if (!part) return "0";
    if (part === "十") return "10";

    let num = 0;
    if (part.startsWith("十")) {
      num = 10 + (numMap[part[1]] || 0);
    } else if (part.endsWith("十")) {
      num = (numMap[part[0]] || 0) * 10;
    } else if (part.includes("十")) {
      const [tenBefore, tenAfter] = part.split("十");
      num = (numMap[tenBefore] || 0) * 10 + (numMap[tenAfter] || 0);
    } else {
      num = numMap[part] || 0;
    }
    return num.toString();
  });

  return result.join(" . ");
}

console.log(convertTitleToNumber("第二十.五课")); // 应输出 "20・5"
console.log(convertTitleToNumber("第五.五课")); // 应输出 "5・5"
console.log(convertTitleToNumber("第十五课")); // 应输出 "15"
console.log(convertTitleToNumber("第十课")); // 应输出 "10"
console.log(convertTitleToNumber("第十.五课")); // 应输出 "25"
