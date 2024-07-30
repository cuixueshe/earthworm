import { http } from "./http";

interface ElementItem {
  element: {
    english: string;
  };
  masteredAt: string;
  id: string;
}

export async function fetchAddMasteredElement(element: { english: string }) {
  return await http.post<ElementItem, ElementItem>(`/mastered-elements`, { element });
}

export async function fetchGetMasteredElements() {
  return await http.get<{ element: { english: string }[] }, { element: { english: string }[] }>(
    `/mastered-elements`,
  );
}

export async function fetchRemoveMasteredElements(elementId: string) {
  return await http.delete<boolean, boolean>(`/mastered-elements/${elementId}`);
}
