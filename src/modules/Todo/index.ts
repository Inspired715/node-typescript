import { Router } from "express";
import todoController from "./todo.controller";

const router = Router();
const { getTodo, getTodos, deleteTodo, postTodo } = todoController;

export default class TodoCtrl {
  constructor() {}

  config(): Router {
    router
      .route("/")
      .get(getTodos)
      .post(postTodo);
    router
      .route("/:id")
      .get(getTodo)
      .delete(deleteTodo);

    return router;
  }
}
