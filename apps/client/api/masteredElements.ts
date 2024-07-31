import type { MasteredElement, MasteredElementContent } from "~/types/models/mastered-elements";
import { http } from "./http";

interface ElementItemApiResponse {
  content: {
    english: string;
  };
  masteredAt: string;
  id: string;
}

export async function fetchAddMasteredElement(content: MasteredElementContent) {
  const result: MasteredElement = await http.post<ElementItemApiResponse, ElementItemApiResponse>(
    `/mastered-elements`,
    {
      content,
    },
  );

  return result;
}

export async function fetchGetMasteredElements() {
  const result: MasteredElement[] = await http.get<
    ElementItemApiResponse[],
    ElementItemApiResponse[]
  >(`/mastered-elements`);

  return result;
}

export async function fetchRemoveMasteredElements(elementId: string) {
  return await http.delete<boolean, boolean>(`/mastered-elements/${elementId}`);
}
