import { Application, Request, Response, NextFunction } from "express";
import TodoCtrl from "../modules/Todo";

export default class Routes {
  private todoCtrl = new TodoCtrl();
  constructor(app: Application) {
    this.config(app);
  }

  config(app: Application): void {
    app.get("/", (_: Request, res: Response, next: NextFunction) => {
      res.send("Welcome to API");
    });
    app.use("/api/todo", this.todoCtrl.config());
    app.use((_: Request, res: Response, next: NextFunction) => {
      res.json({
        message: "No route found"
      });
    });
  }
}
