import fs from "fs";
import { Content, List, ListItem, Root } from "mdast";
import { fromMarkdown } from "mdast-util-from-markdown";
import path from 'path';
const jsonPath = path.resolve();

const markdown = fs.readFileSync("./CHANGELOG.md", "utf-8");

type ExtractedNode = {
  title: string;
  desc: string[];
  url: string;
  link: string;
  author: string;
};

type VersionInfo = {
  version: string;
  time: string;
  fns: {
    title: string;
    lists: ExtractedNode[];
  }[];
};

const extractText = (node: Content): string =>
  "children" in node ? node.children.map((child: Content) => "value" in child ? child.value : '').join("") : "";

const parseListItem = (listItem: ListItem): ExtractedNode =>
  listItem.children.reduce<ExtractedNode>(
    (itemDetails, part) => {
      if (part.type === "paragraph") {
        part.children.forEach((element: Content) => {
          if (element.type === "text") {
            itemDetails.title += element.value;
          } else if (element.type === "link") {
            itemDetails.link = element.url;
            itemDetails.author = extractText(element).replace(/\[|\]/g, "");
          } else if (element.type === "image") {
            itemDetails.url = element.url;
          }
        });
      } else if (part.type === "list") {
        itemDetails.desc = part.children.map((descItem: Content) => extractText(descItem));
      }
      return itemDetails;
    },
    { title: "", desc: [], url: "", link: "", author: "" }
  );

const parseList = (listNode: List): ExtractedNode[] => listNode.children.map((child: ListItem) => parseListItem(child));

const parseMarkdown = (markdown: string): VersionInfo[] => {
  const ast: Root = fromMarkdown(markdown);
  let versions: VersionInfo[] = [];

  ast.children.forEach((node, index) => {
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
    } else if (
      node.type === "heading" &&
      node.depth === 3 &&
      versions.length > 0
    ) {
      const title = node.children[0].value;
      const nextNode = ast.children[index + 1] as List;
      const lists =
        nextNode && nextNode.type === "list" ? parseList(nextNode) : [];
      versions[versions.length - 1].fns.push({ title, lists });
    }
  });

  return versions;
};

const main = (): void => {
  const versions = parseMarkdown(markdown);
  fs.writeFileSync(
    `${jsonPath}/apps/client/assets/changeLogs.json`,
    JSON.stringify(versions, null, 2)
  );
};

main();
