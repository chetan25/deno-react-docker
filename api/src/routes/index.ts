import todoRouter from "./todo.ts";
import todoOrderRouter from "./order.ts";
import { Application } from "../../deps.ts";

const API_VERSION = Deno.env.get("API_VERSION");
const API_URL = `/api/${API_VERSION}`;

const initRouter = (app: Application) => {
  const todoRouterInstance = todoRouter(API_URL);
  app.use(todoRouterInstance.routes());
  app.use(todoRouterInstance.allowedMethods());

  // todo order
  const todoOrderRouterInstance = todoOrderRouter(API_URL);
  app.use(todoOrderRouterInstance.routes());
  app.use(todoOrderRouterInstance.allowedMethods());
};

export { initRouter };
