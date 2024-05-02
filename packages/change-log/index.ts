import fs from "fs";
import path from "path";

import { translate } from "bing-translate-api";
import { Content, List, ListItem, Root } from "mdast";
import { fromMarkdown } from "mdast-util-from-markdown";

const jsonPath = path.resolve();
const markdown = fs.readFileSync("./CHANGELOG.md", "utf-8");

type VersionInfo = {
  version: string;
  time: string;
  fns: {
    title_en: string;
    title_ch: string;
    lists: ExtractedNode[];
  }[];
};

type ExtractedNode = {
  title_en: string;
  title_ch: string;
  desc: { title_en: string; title_ch: string }[];
  url: string;
  link: string;
  author: string;
};

const extractText = (node: Content): string =>
  "children" in node
    ? node.children.map((child: Content) => ("value" in child ? child.value : "")).join("")
    : "";

const parseListItem = async (listItem: ListItem) => {
  let itemDetails = { title_en: "", title_ch: "", desc: [], url: "", link: "", author: "" };

  for (const part of listItem.children) {
    if (part.type === "paragraph") {
      for (const element of part.children) {
        switch (element.type) {
          case "text":
            itemDetails.title_en += element.value;
            itemDetails.title_ch += await translationFn(element.value);
            break;
          case "link":
            itemDetails.link = element.url;
            itemDetails.author = extractText(element).replace(/\[|\]/g, "");
            break;
          case "image":
            itemDetails.url = element.url;
            break;
        }
      }
    } else if (part.type === "list") {
      let result = await Promise.all(
        part.children.map(async (descItem) => {
          let tempDescItem = extractText(descItem.children[0]);
          return tempDescItem
            ? translationFn(tempDescItem).then((title_ch) => ({
                title_en: tempDescItem,
                title_ch,
              }))
            : null;
        }),
      );
      itemDetails.desc = result;
    }
  }

  return itemDetails;
};

const parseList = async (listNode: List) => {
  const listItems = listNode.children.map(parseListItem);
  return await Promise.all(listItems);
};
const parseMarkdown = async (markdown: string) => {
  const ast: Root = fromMarkdown(markdown);
  let versions:
    | PromiseLike<VersionInfo[]>
    | { fns: { title_en: any; title_ch: string; lists: ExtractedNode[] }[] }[] = [];

  const promises = ast.children.map(async (node, index) => {
    if (node.type === "heading" && node.depth === 2) {
      const versionInfo = node.children[0].value.match(/V\d+\.\d+\.\d+ \(\d{4}\.\d+\.\d+\)/);
      if (versionInfo) {
        const [version, time] = versionInfo[0].split(" (");
        versions.push({
          version: version.trim(),
          time: time.replace(")", "").trim(),
          fns: [],
        });
      }
    } else if (node.type === "heading" && node.depth === 3 && versions.length > 0) {
      const title_en = node.children[0].value;
      const title_ch = await translationFn(node.children[0].value);
      const nextNode = ast.children[index + 1] as List;
      const lists = nextNode && nextNode.type === "list" ? await parseList(nextNode) : [];
      versions[versions.length - 1].fns.push({ title_en, title_ch, lists });
    }
  });
  await Promise.allSettled(promises);
  return versions;
};
const translationFn = async (text: string) => {
  if (!text) return text;
  try {
    const result = await translate(text, null, "zh-Hans");
    return (result && result?.translation) || text;
  } catch (error) {
    // console.error('翻译错误:', error);
    return text;
  }
};

const main = async () => {
  console.log("====================================");
  console.log("开始解析...");
  const versionsData = await parseMarkdown(markdown);
  try {
    fs.writeFileSync(
      `${jsonPath}/apps/client/assets/changeLogs.json`,
      JSON.stringify(versionsData, null, 2),
    );
    console.log("解析成功");
    console.log("====================================");
  } catch (error) {
    console.error("解析失败:", error);
  }
};

main().catch(console.error);
