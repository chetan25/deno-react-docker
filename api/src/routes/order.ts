import { Router, RouterOptions } from "../../deps.ts";
import { getAllController, updateController } from "../controlers/order.ts";

const routerFunction = (url: string) => {
  const TODO_URL = `${url}/todo-order`;
  const routerOptions: RouterOptions = {
    prefix: TODO_URL,
  };
  const router = new Router(routerOptions);

  router.get("/", getAllController);
  router.put("/", updateController);

  return router;
};

export default routerFunction;
