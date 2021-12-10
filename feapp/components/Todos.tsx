import React, { useEffect } from "react";
import Card from "../components/Card";
import DraggableSection from "../components/DraggableSection";
import useDrag from "../hooks/useDrag";
import { useTodosContext, TodoStates } from "../components/TodoContext";

const Todos = () => {
  const { todos } = useTodosContext();
  useDrag(
    Array(todos!.length)
      .fill("")
      .map((_, index) => `group${index + 1}`)
  );

  if (todos!.length < 1) {
    return null;
  }

  return (
    <div className="uk-child-width-1-3@s" data-uk-grid>
      {Array(todos!.length)
        .fill(1)
        .map((_, index) => {
          return (
            <div key={index}>
              <h4 className="uk-text-center">{TodoStates[index]}</h4>
              <DraggableSection
                data-id={TodoStates[index]}
                id={`group${index + 1}`}
              >
                {todos![index].map((todo) => {
                  return (
                    <Card
                      groupId={index + 1}
                      todoId={todo.id}
                      key={todo.title}
                      title={todo.title}
                    />
                  );
                })}
              </DraggableSection>
            </div>
          );
        })}
    </div>
  );
};

export default Todos;
