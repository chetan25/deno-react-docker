// deno-lint-ignore-file no-explicit-any
import { Todo, TodoUpdate } from "../model/todoModel.ts";
import { Bson } from "../../deps.ts";

export interface DataBase {
  getAll(): Promise<Todo[]>;
  get(id: string): Promise<Todo>;
  insertOne(todo: Todo): Promise<Bson.ObjectId>;
  updateOne(id: string, todo: TodoUpdate): Promise<Record<string, any>>;
  deleteOne(id: string): Promise<number>;
}
