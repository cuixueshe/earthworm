import { defineStore } from "pinia";
import { computed, ref } from "vue";

import type { MasteredElement, MasteredElementContent } from "~/types/models/mastered-elements";
import {
  fetchAddMasteredElement,
  fetchGetMasteredElements,
  fetchRemoveMasteredElements,
} from "~/api/mastered-elements";

export const useMasteredElementsStore = defineStore("masteredElements", () => {
  const masteredElements = ref<MasteredElement[]>([]);

  const totalMasteredElementsCount = computed(() => {
    return masteredElements.value.length;
  });

  async function addElement(content: MasteredElementContent) {
    const result = await fetchAddMasteredElement(content);
    const previousElements = [...masteredElements.value];
    masteredElements.value.unshift(result);

    return () => {
      masteredElements.value = previousElements;
      fetchRemoveMasteredElements(result.id).catch(console.error);
    };
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
