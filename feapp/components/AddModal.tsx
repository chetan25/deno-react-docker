import React from "react";
import useAddTodo from "../hooks/useAddTodo";
import { TodoStates } from "../components/TodoContext";
const AddModal = () => {
  const { titleRef, descriptionRef, todoStateRef, submitForm, cancelAdd } =
    useAddTodo();

  return (
    <div className="uk-modal-dialog">
      <button
        className="uk-modal-close-default"
        type="button"
        data-uk-close
        onClick={cancelAdd}
      ></button>
      <div className="uk-modal-header">
        <h2 className="uk-modal-title">Add a Todo</h2>
      </div>
      <div className="uk-modal-body">
        <form>
          <fieldset className="uk-fieldset">
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="title">
                Title
              </label>
              <div className="uk-form-controls">
                <input
                  type="text"
                  id="title"
                  className="uk-input"
                  placeholder="Enter a title"
                  ref={titleRef}
                />
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="description">
                Description
              </label>
              <div className="uk-form-controls">
                <textarea
                  className="uk-textarea"
                  name="todo-description"
                  ref={descriptionRef}
                  id="description"
                  rows={5}
                  placeholder="Enter todo description"
                ></textarea>
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="state">
                Todo State
              </label>
              <div className="uk-form-controls">
                <select
                  name="state-options"
                  id="state"
                  className="uk-select"
                  defaultValue=""
                  ref={todoStateRef}
                >
                  <option disabled value="">
                    ----Select the state for todo---
                  </option>
                  <option value={TodoStates[0]}>{TodoStates[0]}</option>
                  <option value={TodoStates[1]}>{TodoStates[1]}</option>
                  <option value={TodoStates[2]}>{TodoStates[2]}</option>
                </select>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="uk-modal-footer uk-text-right">
        <button
          type="button"
          className="uk-button uk-button-primary uk-margin-small-right"
          onClick={submitForm}
        >
          Save
        </button>
        <button
          type="button"
          onClick={cancelAdd}
          className="uk-button uk-button-default uk-margin-small-right uk-modal-close"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddModal;
