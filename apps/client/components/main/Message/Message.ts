import { h, render } from "vue";
import MessageContrustor from "./message.vue";
// 使用函数
type Params = {
  type: "success" | "error" | "warning";
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

  const vNode = h(MessageContrustor, { type, text });
  render(vNode, rootContainer);
  clearTimeout(timer);
  timer = setTimeout(() => {
    render(null, rootContainer);
  }, duration);
}

Message.success = (text: string, props?: MessageProps) => {
  Message({
    text,
    type: "success",
    duration: props?.duration,
  });
  props?.onLeave?.();
};
Message.error = (text: string, props?: MessageProps) => {
  Message({
    text,
    type: "error",
    duration: props?.duration,
  });
  props?.onLeave?.();
};
Message.warning = (text: string, props?: MessageProps) => {
  Message({
    text,
    type: "warning",
    duration: props?.duration,
  });
  props?.onLeave?.();
};

export default Message;
