import { useEffect } from "react";
import UIkit from "uikit";
import { TodoStates, useTodosContext } from "../components/TodoContext";

type Methods = {
  deleteTodo: (todoId: string, groupId: number) => void;
};
const addDragListener = (groupId: string, methods: Methods) => {
  //@ts-ignore
  UIkit.util.on(groupId, "moved", function (elemnt) {
    //@ts-ignore
    console.log("moved in group", elemnt);
  });

  //@ts-ignore
  UIkit.util.on(groupId, "removed", function (element) {
    //@ts-ignore
    console.log("removed in group", element);

    const id = +element.detail[1].id;
    // find group
    const groupIndex = TodoStates.findIndex(
      (state) => state === element.srcElement.dataset.id
    );
    // work around to attach the elemet back for react to handle the Dom manupulation
    // instead of uikit
    element.srcElement.appendChild(element.detail[1]);
    methods.deleteTodo(String(id), groupIndex + 1);
  });

  //@ts-ignore
  UIkit.util.on(groupId, "added", function (element, options) {
    //@ts-ignore
    console.log("added in group", element, options);

    // id of elemet to copy
    const id = +element.detail[1].id;
    // all nodes of current group
    const nodesList = element.target.childNodes;
    const nodes = [...nodesList];
    // find group
    const movedGroupIndex = TodoStates.findIndex(
      (state) => state === element.srcElement.dataset.id
    );

    // TODO find the element in current todos

    // work around to attach the elemet back for react to handle the Dom manupulation
    // instead of uikit
    // element.srcElement.removeChild(element.detail[1]);
    // methods.deleteTodo(String(id), groupIndex + 1);
  });
};
const useDrag = (groups: string[]) => {
  const { deleteTodo } = useTodosContext();

  useEffect(() => {
    groups.map((group) => {
      addDragListener(`#${group}`, {
        deleteTodo: deleteTodo,
      });
    });
  }, []);
};

export default useDrag;
