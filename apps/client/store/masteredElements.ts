import { defineStore } from "pinia";
import { computed, ref } from "vue";

import type { MasteredElement, MasteredElementContent } from "~/types/models/mastered-elements";
import {
  fetchAddMasteredElement,
  fetchGetMasteredElements,
  fetchRemoveMasteredElements,
} from "~/api/masteredElements";

export const useMasteredElementsStore = defineStore("masteredElements", () => {
  const masteredElements = ref<MasteredElement[]>([]);

  const totalMasteredElementsCount = computed(() => {
    return masteredElements.value.length;
  });

  async function addElement(content: MasteredElementContent) {
    const result = await fetchAddMasteredElement(content);
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
      return element.content.english.toLowerCase() === english.toLowerCase();
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
