import { afterEach, describe, expect, test } from "vitest";
import MessageBox from "../MessageBox";
import { nextTick } from "vue";

const selector = ".modal";

const rAF = async () => {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null);
        await nextTick();
      });
    });
  });
};

describe("MessageBox", () => {
  afterEach(async () => {
    MessageBox.close();
    document.body.innerHTML = "";
    await rAF();
  });

  test("create messageBox", async () => {
    MessageBox("这是一段内容", "消息");
    let msgbox: any = document.querySelector(selector);

    expect(msgbox).toBeDefined();
    expect(msgbox.querySelector(".font-bold").textContent).toEqual("消息");
    expect(msgbox.querySelector(".py-4").textContent).toEqual("这是一段内容");
  });

  test("close messageBox", async () => {
    MessageBox("这是一段内容", "消息");

    MessageBox.close();
    let msgbox: any = document.querySelector(selector);
    expect(msgbox).toBe(null);
  });

  describe("promise", () => {
    test("confirm", async () => {
      let msgAction = "";
      MessageBox("此操作将永久删除该文件, 是否继续?", "提示").then((action) => {
        msgAction = action;
      });
      await rAF();
      const btn = document
        .querySelector(selector)!
        .querySelector(".confirm") as HTMLButtonElement;
      btn.click();
      await rAF();

      expect(msgAction).toEqual("confirm");
    });

    test("cancel", async () => {
      let msgAction = "";
      MessageBox("此操作将永久删除该文件, 是否继续?", "提示").catch(
        (action) => {
          msgAction = action;
        }
      );
      await rAF();
      const btn = document
        .querySelector(selector)!
        .querySelector(".cancel") as HTMLButtonElement;
      btn.click();
      await rAF();

      expect(msgAction).toEqual("cancel");
    });
  });
});
