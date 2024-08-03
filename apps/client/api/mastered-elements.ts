import type { MasteredElement, MasteredElementContent } from "~/types";
import { getHttp } from "./http";

interface ElementItemApiResponse {
  content: {
    english: string;
  };
  masteredAt: string;
  id: string;
}

export async function fetchAddMasteredElement(content: MasteredElementContent) {
  const http = getHttp();
  return (await http<ElementItemApiResponse>(`/mastered-elements`, {
    method: "post",
    body: { content },
  })) as MasteredElement;
}

export async function fetchGetMasteredElements() {
  const http = getHttp();
  return (await http<ElementItemApiResponse[]>(`/mastered-elements`, {
    method: "get",
  })) as MasteredElement[];
}

export async function fetchRemoveMasteredElements(elementId: string) {
  const http = getHttp();
  return (await http<boolean>(`/mastered-elements/${elementId}`, {
    method: "delete",
  })) as boolean;
}
