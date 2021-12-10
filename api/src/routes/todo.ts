import { Router } from "../../deps.ts";
import {
  getController,
  postController,
  getAllController,
  deleteController,
  updateController,
} from "../controlers/todo.ts";

const routerFunction = (url: string) => {
  const TODO_URL = `${url}/todo`;
  console.log(TODO_URL, "TODO_URL");
  const router = new Router({
    prefix: TODO_URL,
  });

  router.get("/:id", getController);
  router.get("/", getAllController);
  router.post("/", postController);
  router.delete("/:id", deleteController);
  router.put("/:id", updateController);

  return router;
};

export default routerFunction;
