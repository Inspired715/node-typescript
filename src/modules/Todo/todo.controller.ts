import { Request, Response, NextFunction } from "express";

class TodoController {
  constructor() {}

  getTodo(req: Request, res: Response, next: NextFunction) {
    res.json({
      message: "This is a get route!!"
    });
  }

  getTodos(req: Request, res: Response, next: NextFunction) {
    console.log("--> this is get route");
  }

  postTodo(req: Request, res: Response, next: NextFunction) {}

  deleteTodo(req: Request, res: Response, next: NextFunction) {}
}

export default new TodoController();
