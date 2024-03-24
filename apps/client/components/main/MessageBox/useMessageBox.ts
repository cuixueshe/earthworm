import { createVNode, render, type ComponentPublicInstance } from "vue";
import type { IMessageBoxProps } from "~/composables/messageBox/modal";
import MessageBoxConstructor from "./MessageBox.vue";

interface MessageBoxOptions {
  /** Text content of confirm button */
  confirmBtnText: string;
  /** Text content of cancel button */
  cancelBtnText: string;
  /** Custom element to append the message box to */
  appendTo?: HTMLElement | string;
}

type Action = "confirm" | "cancel";

interface MessageBoxProps extends IMessageBoxProps {
  container: HTMLElement;
}

const messageInstance = new Map<
  ComponentPublicInstance<MessageBoxProps>,
  {
    options: any;
    reject: (res: any) => void;
    resolve: (reson?: any) => void;
  }
>();

const genContainer = () => {
  return document.createElement("div");
};

const getAppendToElement = (props: any): HTMLElement => {
  let appendTo: HTMLElement | null = document.body;
  if (props.appendTo) {
    if (typeof props.appendTo === "string") {
      appendTo = document.querySelector<HTMLElement>(props.appendTo);
    }
    if (props.appendTo instanceof Element) {
      appendTo = props.appendTo;
    }
    if (!(appendTo instanceof Element)) {
      appendTo = document.body;
    }
  }
  return appendTo;
};

const teardown = (
  vm: ComponentPublicInstance<MessageBoxProps>,
  container: HTMLElement
) => {
  render(null, container);
  messageInstance.delete(vm);
};

const initInstance = (props: any, container: HTMLElement) => {
  const vnode = createVNode(MessageBoxConstructor, props);
  render(vnode, container);
  getAppendToElement(props).appendChild(container.firstElementChild!);
  return vnode.component;
};

const showMessage = (options: any) => {
  const container = genContainer();

  options.onConfirm = () => {
    const currentMsg = messageInstance.get(vm)!;
    currentMsg.resolve("confirm");

    teardown(vm, container);
  };

  options.onCancel = () => {
    const currentMsg = messageInstance.get(vm)!;
    currentMsg.reject("cancel");

    teardown(vm, container);
  };

  const instance = initInstance(options, container)!;

  const vm = instance.proxy as ComponentPublicInstance<MessageBoxProps>;

  vm.container = container;

  for (const prop in options) {
    if (Object.hasOwn(options, prop) && !Object.hasOwn(vm.$props, prop)) {
      vm[prop as keyof ComponentPublicInstance] = options[prop];
    }
  }

  return vm;
};

function MessageBox(
  content: string = "Are you sure?",
  title: string = "Tips",
  options?: MessageBoxOptions
): Promise<Action> {
  return new Promise((resolve, reject) => {
    const vm = showMessage(
      Object.assign(
        {
          content,
          title,
          isShowModal: true,
          confirmBtnText: "Confirm",
          cancelBtnText: "Cancel",
        },
        options
      )
    );
    messageInstance.set(vm, {
      options,
      resolve,
      reject,
    });
  });
}

MessageBox.close = () => {
  messageInstance.forEach((_, vm) => {
    teardown(vm, vm.container);
  });
};

export default MessageBox;
