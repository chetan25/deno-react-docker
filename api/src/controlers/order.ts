import { validateRequest } from "../helper/validation.ts";
import { RouterContext } from "../../deps.ts";
import { todoSchemaUpdate } from "../model/todoModel.ts";
import { MongoDatabase } from "../db/mongoDatabase.ts";

export const getAllController = async (context: RouterContext<"/">) => {
  console.log("fetching all order");
  try {
    const mongoDb = new MongoDatabase();
    await mongoDb.initDb("order");
    const response = await mongoDb.getTodoOrder();

    console.log(response, "response");
    // context.response.headers.set("Content-Type", "application/json");
    context.response.body = {
      success: true,
      numberOfGroups: response[0].results.firstValues.length,
      numberOfTodos: response[0].results.data.length,
      data: response[0].results,
    };
  } catch (error) {
    console.log("Error fetching order", error);
    context.response.status = 500;
    context.response.body = {
      success: true,
      length: 0,
      error: "Error fetching order",
    };
  }
};

export const updateController = async (context: RouterContext<"/">) => {
  try {
    console.log(`Updating order}`);
    const mongoDb = new MongoDatabase();
    await mongoDb.initDb("order");
    const body = context.request.body();
    const data = await body.value;
    if (!data) {
      throw new Error("Nothing to update");
    }
    await validateRequest(data, todoSchemaUpdate);
    const result = await mongoDb.updateTodoOrders(data);
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
