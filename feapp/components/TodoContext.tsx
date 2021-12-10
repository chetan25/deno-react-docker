import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

type GroupTodos = Record<string, string>[][];

const TODOS_DEFAULT: GroupTodos = [
  [
    {
      title: "Card 1 Gropu 1",
      id: "1",
    },
    {
      title: "Card 2 Gropu 1",
      id: "2",
    },
  ],
  [
    {
      title: "Card 1 Gropu 2",
      id: "3",
    },
  ],
  [
    {
      title: "Card 1 Gropu 3",
      id: "4",
    },
    {
      title: "Card 2 Gropu 3",
      id: "5",
    },
    {
      title: "Card 3 Gropu 3",
      id: "6",
    },
  ],
];

export const TodoStates = ["Waiting", "Started", "Finished"];

export const checkLocalStorage = (key: string) => {
  console.log(localStorage.hasOwnProperty(key));
  return localStorage.hasOwnProperty(key);
};

export const getFromLocalStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key)!);
};

export const setToLocalStorage = <T,>(key: string, data: T) => {
  console.log({ data });
  localStorage.setItem(key, JSON.stringify(data));
};

const TodoContext = createContext<{
  todos: GroupTodos | [];
  setTodos: (val: GroupTodos) => void;
  deleteTodo: (todoId: string, groupId: number) => void;
}>({
  todos: [],
  setTodos: (val: GroupTodos) => {},
  deleteTodo: (todoId: string, groupId: number) => {},
});

export const TodosContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todos, setTodosState] = useState<GroupTodos | []>([]);

  const setTodos = (updatedTodos: GroupTodos) => {
    console.log("called");
    setToLocalStorage("todos", updatedTodos);
    setTodosState(updatedTodos);
  };

  useEffect(() => {
    if (checkLocalStorage("todos")) {
      const todos = getFromLocalStorage("todos");
      setTodos(todos);
    } else {
      setToLocalStorage("todos", TODOS_DEFAULT);
      const todos = TODOS_DEFAULT;
      setTodos(todos);
    }
    const fetchTodo = async () => {
      const res = await axios.get("/api/v1/todo-order");
      console.log(res, "from server");

      return res;
    };
    fetchTodo();
  }, []);

  const deleteTodo = (todoId: string, groupId: number) => {
    const updatedTodso = [...todos];
    const groupIndex = groupId - 1;
    const groupTodos = updatedTodso[groupIndex];
    const todoIndex = groupTodos.findIndex((todo) => {
      return todo.id === todoId;
    });
    if (todoIndex < 0) {
      console.warn("Cannot find todo to delete");
      return;
    }
    groupTodos.splice(todoIndex, 1);
    updatedTodso[groupIndex] = groupTodos;
    setTodos(updatedTodso);
  };

  return (
    <TodoContext.Provider value={{ todos, setTodos, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodosContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("Use hook under a Provider");
  }

  return context;
};
