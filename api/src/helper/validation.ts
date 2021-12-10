import { validate, firstMessages, Bson, ValidationRules } from "../../deps.ts";
import { Todo, TodoUpdate } from "../model/todoModel.ts";

export const validateRequest = async (
  todo: Todo | TodoUpdate,
  schema: ValidationRules
) => {
  const [passes, errors] = await validate(todo, schema);

  if (!passes) {
    throw firstMessages(errors);
  }

  return true;
};

export const isValidMongoId = (id: string) => {
  return Bson.ObjectId.isValid(id);
};
