import React from "react";
import { useTodosContext } from "../components/TodoContext";

const Card = ({
  title,
  todoId,
  groupId,
}: {
  title: string;
  todoId: string;
  groupId: number;
}) => {
  const { deleteTodo } = useTodosContext();
  return (
    <div className="uk-margin" id={todoId}>
      <div className="uk-card uk-card-default uk-card-body uk-card-small">
        {title}
        <div className="uk-align-right">
          <ul className="uk-iconnav">
            <li>
              <a href="#" uk-icon="icon: file-edit"></a>
            </li>
            <li>
              <a href="#" uk-icon="icon: copy"></a>
            </li>
            <li
              onClick={(e) => {
                e.preventDefault();
                deleteTodo(todoId, groupId);
              }}
            >
              <a href="#" uk-icon="icon: trash"></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;
