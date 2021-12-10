// import MongoDatabase from "../helper/mongodb.ts";
import { validateRequest } from "../helper/validation.ts";
import { RouterContext } from "../../deps.ts";
import {
  TodoUpdate,
  todoSchemaUpdate,
  todoSchema,
} from "../model/todoModel.ts";
import { MongoDatabase } from "../db/mongoDatabase.ts";

// interface TodoSchema extends Todo {
//   _id: Bson.ObjectIdLike;
// }

// const mongoDbInstance = await MongoDatabase.getInstance();
// const mongoDb = mongoDbInstance.getDataBase.collection("todo");

export const getController = async (context: RouterContext<"/:id">) => {
  const id: string = context.params.id;
  console.log(`fetching single todo ${id}`);

  try {
    const mongoDb = new MongoDatabase();
    if (!mongoDb.validateId(id)) {
      throw new Error("Not Valid Id");
    }
    await mongoDb.initDb("todo");
    const todo = await mongoDb.get(id);
    console.log(todo, "todo");
    if (!todo) {
      throw new Error("No todo found");
    }
    context.response.body = {
      success: true,
      data: todo,
    };
  } catch (error) {
    console.log(`Error fetching todo with id ${id}`, error);
    if (error.include("No todo found")) {
      context.response.status = 404;
    } else {
      context.response.status = 500;
    }
    context.response.body = {
      success: true,
      error: error,
    };
  }
};

export const postController = async (context: RouterContext<"/">) => {
  console.log("adding todo");
  const body = context.request.body();
  const data = await body.value;

  console.log(data, "data");
  try {
    const mongoDb = new MongoDatabase();
    await mongoDb.initDb("todo");
    const result = await mongoDb.insertOne(data);
    data["_id"] = result;
    console.log("result", result);
    await validateRequest(result, todoSchema);
    context.response.body = {
      success: true,
      data: data,
    };
  } catch (error) {
    context.response.status = 400;
    context.response.body = {
      success: false,
      error: error,
    };
  }
};

export const getAllController = async (context: RouterContext<"/">) => {
  console.log("fetching all todos");
  try {
    const mongoDb = new MongoDatabase();
    await mongoDb.initDb("todo");
    const allTodos = await mongoDb.getAll();

    console.log(allTodos, "allTodos");
    // context.response.headers.set("Content-Type", "application/json");
    context.response.body = {
      success: true,
      length: allTodos.length,
      data: allTodos,
    };
  } catch (error) {
    console.log("Error fetching todos", error);
    context.response.status = 500;
    context.response.body = {
      success: true,
      length: 0,
      error: "Error fetching todos",
    };
  }
};

export const deleteController = async (context: RouterContext<"/:id">) => {
  const id = context.params.id;
  console.log(`Delete todo with ${id}`);
  const mongoDb = new MongoDatabase();
  try {
    if (!mongoDb.validateId(id)) {
      throw new Error("Not Valid Id");
    }
    await mongoDb.initDb("todo");
    const todo = await mongoDb.deleteOne(id);
    console.log(todo, "todo");
    if (!todo) {
      throw new Error("No todo found to delete");
    }
    context.response.body = {
      success: true,
      data: todo,
    };
  } catch (error) {
    console.log(`Error Deleting todo with id ${id}`, error);
    if (error.include("No todo found to delete")) {
      context.response.status = 404;
    } else {
      context.response.status = 500;
    }
    context.response.body = {
      success: true,
      error: error,
    };
  }
};

export const updateController = async (context: RouterContext<"/:id">) => {
  try {
    const id = context.params.id;
    console.log(`Updating todo for ${id}`);
    const mongoDb = new MongoDatabase();
    if (!mongoDb.validateId(id)) {
      throw new Error("Not Valid Id");
    }
    await mongoDb.initDb("todo");
    const body = context.request.body();
    const data: TodoUpdate = await body.value;
    if (!data) {
      throw new Error("Nothing to update");
    }
    await validateRequest(data, todoSchemaUpdate);
    const result = await mongoDb.updateOne(id, data);
    context.response.body = {
      success: true,
      data: result,
    };
  } catch (error) {
    context.response.status = 500;
    context.response.body = {
      success: false,
      error: error,
    };
  }
};
