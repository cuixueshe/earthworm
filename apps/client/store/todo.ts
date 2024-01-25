import { defineStore } from "pinia";

interface Todo {
  title: string;
}
export const useTodoStore = defineStore("todo", () => {
  const todos = ref<Todo[]>();

  return {
	todos
  };
});
