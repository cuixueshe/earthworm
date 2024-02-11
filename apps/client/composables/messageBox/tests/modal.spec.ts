import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";
import { type IMessageBoxProps } from "../modal";
import MessageBoxVue from "~/components/main/MessageBox.vue";

function mockProps(isShowModal: boolean): IMessageBoxProps {
  return {
    isShowModal,
    content: "content",
    title: "title",
    confirmBtnText: "confirm",
    cancelBtnText: "cancel",
  };
}
let wrapper: VueWrapper<any>;
function mockWrapper() {
  return mount(MessageBoxVue, {
    props: {
      ...mockProps(true),
      "onUpdate:isShowModal": (e: any) => wrapper.setProps({ isShowModal: e }),
    },
  });
}

describe("message box modal", () => {
  beforeEach(() => {
    wrapper = mockWrapper();
  });
  afterEach(() => {
    wrapper.unmount();
  });

  it("should have default props", () => {
    const wrapper = mount(MessageBoxVue, {
      props: {
        isShowModal: true,
      },
    });
    expect(wrapper.props()).toMatchInlineSnapshot(`
        {
          "cancelBtnText": "Cancel",
          "confirmBtnText": "Confirm",
          "content": "Are you sure?",
          "isShowModal": true,
          "title": "Tips",
        }
      `);
    wrapper.unmount();
  });

  it("should open modal when isShowModal is true", () => {
    const modalContainerAttributes = wrapper.find(".modal").attributes();

    expect(modalContainerAttributes).toHaveProperty("open");
  });

  it("should close modal when cancel btn was clicked", async () => {
    await wrapper.find("form > .btn").trigger("click");

    expect(wrapper.emitted("update:isShowModal")?.[0][0]).toBe(false);
    expect(wrapper.get(".modal").attributes()).not.toHaveProperty("open");
    expect(wrapper.props("isShowModal")).toBe(false);
  });

  it("should close modal when confirm btn was clicked", async () => {
    await wrapper.find(".modal-action > .btn").trigger("click");

    expect(wrapper.get(".modal").attributes()).not.toHaveProperty("open");
    expect(wrapper.props("isShowModal")).toBe(false);
  });

  it("should remove event listener when modal is closed", async () => {
    vi.spyOn(document, "removeEventListener");
    await wrapper.find(".modal-action > .btn").trigger("click");

    expect(document.removeEventListener).toBeCalled();
    expect(document.removeEventListener).toBeCalledTimes(1);
  });
});
