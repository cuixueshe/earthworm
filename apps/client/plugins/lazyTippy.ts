import type { Instance } from "tippy.js";

import { defineNuxtPlugin } from "nuxt/app";
import tippy, { createSingleton } from "tippy.js";

import "tippy.js/dist/tippy.css";
import "tippy.js/dist/svg-arrow.css";

export default defineNuxtPlugin(() => {
  const tippyInstances = new Map<HTMLElement, Instance>();
  const options = {
    arrow: true, // 箭头
    allowHTML: true, // 允许 html
    duration: 0, // 显示/隐藏动画时间
    showOnCreate: true, // 创建时显示
  };

  // 创建打卡图 tip 单例
  const tippySingleton = createSingleton([], {
    moveTransition: "transform 0.1s ease-out",
  });

  return {
    provide: {
      lazyTippy: (e: MouseEvent, placement: "top" | "bottom" = "top") => {
        const target = e.target as HTMLElement;
        if (!target) return;

        let instance = tippyInstances.get(target);
        if (!instance) {
          instance = tippy(target, {
            ...options,
            placement,
          });
          tippyInstances.set(target, instance);
        } else {
          // 针对虚拟列表处理，没有缓存只更新 tippy 内容
          instance.setProps({
            content: target.dataset.tippyContent,
          });
        }

        instance.show();
      },

      calendarTippy: (e: MouseEvent, container?: HTMLElement | null) => {
        const target = e.target as HTMLElement;
        const calendarContainer = container || target;

        if (!target) return;

        tippySingleton.setProps({
          getReferenceClientRect: () => target.getBoundingClientRect(),
          content: target.dataset.tippyContent,
        });

        // 鼠标移出整个日历容器隐藏
        calendarContainer.onmouseleave = () => {
          tippySingleton.hide();
        };

        tippySingleton.show(target);
      },
    },
  };
});
