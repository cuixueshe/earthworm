import { mount } from "@vue/test-utils";

export function useSetup<V>(setup: () => V) {
  const comp = {
    setup,
    render() {},
  };

  const wrapper = mount(comp);
  return {
    wrapper,
  };
}
