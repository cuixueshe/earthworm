import { h, render } from "vue";

import MessageConstructor from "./Message.vue";

export enum Type {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
}

// 使用函数
type Params = {
  type: Type;
  text: string;
  duration?: number;
};
interface MessageProps {
  duration: number;
  onLeave?: (params?: any) => void;
}
function Message({ type, text, duration = 2000 }: Params) {
  let timer;

  const rootContainer = document.body;

  const vNode = h(MessageConstructor, { type, text });
  render(vNode, rootContainer);
  clearTimeout(timer);
  timer = setTimeout(() => {
    render(null, rootContainer);
  }, duration);
}

Message.success = (text: string, props?: MessageProps) => {
  Message({
    text,
    type: Type.SUCCESS,
    duration: props?.duration,
  });
  props?.onLeave?.();
};

Message.error = (text: string, props?: MessageProps) => {
  Message({
    text,
    type: Type.ERROR,
    duration: props?.duration,
  });
  props?.onLeave?.();
};

Message.warning = (text: string, props?: MessageProps) => {
  Message({
    text,
    type: Type.WARNING,
    duration: props?.duration,
  });
  props?.onLeave?.();
};

export default Message;
