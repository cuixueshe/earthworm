import { defineStore } from "pinia";
import { computed, ref } from "vue";

import {
  fetchAddMasteredElement,
  fetchGetMasteredElements,
  fetchRemoveMasteredElements,
} from "~/api/masteredElements";

interface Element {
  english: string;
}

interface ElementItem {
  element: {
    english: string;
  };
  masteredAt: string;
  id: string;
}

export const useMasteredElementsStore = defineStore("masteredElements", () => {
  const masteredElements = ref<ElementItem[]>([]);

  const totalMasteredElementsCount = computed(() => {
    return masteredElements.value.length;
  });

  async function addElement(element: Element) {
    const result = await fetchAddMasteredElement(element);
    masteredElements.value.unshift(result);
  }

  async function removeElement(elementId: string) {
    await fetchRemoveMasteredElements(elementId);

    masteredElements.value = masteredElements.value.filter(({ id }) => {
      return id !== elementId;
    });
  }

  function checkMastered(english: string) {
    return !!masteredElements.value.find((element) => {
      return element.element.english.toLowerCase() === english.toLowerCase();
    });
  }

  async function setup() {
    const elements = await fetchGetMasteredElements();
    masteredElements.value = [...elements];
  }

  return {
    masteredElements,
    totalMasteredElementsCount,
    addElement,
    removeElement,
    checkMastered,
    setup,
  };
});
