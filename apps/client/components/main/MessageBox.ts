import { createVNode, render, type ComponentPublicInstance } from "vue";
import MessageBoxConstructor from "./MessageBox.vue";

const messageInstance = new Map<any, any>();

const genContainer = () => {
  return document.createElement("div");
};

const getAppendToElement = (): any => {
  const appendTo: any | null = document.body;
  return appendTo;
};

const initInstance = (props: any, container: HTMLElement) => {
  const vnode = createVNode(MessageBoxConstructor, props);
  render(vnode, container);
  getAppendToElement().appendChild(container.firstElementChild!);
  return vnode.component;
};

const showMessage = (options: any) => {
  const container = genContainer();

  options.onConfirm = () => {
    const currentMsg = messageInstance.get(vm)!;
    currentMsg.resolve("confirm");

    render(null, container);
    messageInstance.delete(vm);
  };

  options.onCancel = () => {
    const currentMsg = messageInstance.get(vm)!;
    currentMsg.reject("cancel");

    render(null, container);
    messageInstance.delete(vm);
  };

  const instance: any = initInstance(options, container);

  const vm = instance.proxy;

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
  options?: any
): Promise<any> {
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
    vm.isShowModel = false;
  });

  messageInstance.clear();
};

export default MessageBox;
