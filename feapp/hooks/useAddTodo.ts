import { useRef } from "react";
import { TodoStates, useTodosContext } from "../components/TodoContext";
import UIkit from "uikit";

const useAddTodo = () => {
  const { todos, setTodos } = useTodosContext();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const todoStateRef = useRef<HTMLSelectElement | null>(null);

  const submitForm = () => {
    const groupIndex = TodoStates.findIndex(
      (state) => state === todoStateRef!.current?.value
    );
    if (groupIndex < 0) {
      throw new Error("Not a valid todo state selected");
    }
    const group = [...todos[groupIndex]];
    const newTodo = {
      id: String(Math.floor(Math.random() * 100)),
      title: titleRef!.current?.value || "test",
      description: descriptionRef!.current?.value || "test desc",
    };
    group.push(newTodo);
    const updatedTodo = [...todos];
    updatedTodo[groupIndex] = group;
    setTodos(updatedTodo);
    titleRef!.current!.value = "";
    descriptionRef!.current!.value = "";
    todoStateRef!.current!.value = "";
    UIkit.modal("#add-modal").hide();
  };

  const cancelAdd = () => {
    titleRef!.current!.value = "";
    descriptionRef!.current!.value = "";
    todoStateRef!.current!.value = "";
  };

  return {
    titleRef,
    descriptionRef,
    todoStateRef,
    submitForm,
    cancelAdd,
  };
};

export default useAddTodo;
