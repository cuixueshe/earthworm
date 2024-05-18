import type { Instance } from "tippy.js";

import { defineNuxtPlugin } from "nuxt/app";
import tippy from "tippy.js";

import "tippy.js/dist/tippy.css";
import "tippy.js/dist/svg-arrow.css";

export default defineNuxtPlugin(() => {
  const tippyInstances = new Map<HTMLElement, Instance>();
  const options = {
    moveTransition: "transform 0.1s ease-out", // 移动动画
    arrow: true, // 箭头
    allowHTML: true, // 允许html
    duration: 0, // 显示/隐藏动画时间
    showOnCreate: true, // 创建时显示
  };

  return {
    provide: {
      lazyTippy: (e: MouseEvent, placement: "top" | "bottom" = "top", cache = true) => {
        const target = e.target as HTMLElement;
        if (!target) return;

        // 针对虚拟列表，不进行缓存
        if (!cache) {
          tippy(target, {
            ...options,
            placement,
            onHidden(instance) {
              instance.destroy();
            },
          });

          return;
        }

        let instance = tippyInstances.get(target);

        if (!instance) {
          instance = tippy(target, {
            ...options,
            placement,
          });
          tippyInstances.set(target, instance);
        }

        instance.show();
      },
    },
  };
});
