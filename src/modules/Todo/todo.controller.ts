import { Request, Response, NextFunction } from "express";
const sql = require("mssql");
import { executeQuery } from "../../utils";

class TodoController {
  constructor() {}

  async getTodo(req: Request, res: Response, next: NextFunction) {
    const {
      params: { id }
    } = req;

    const Q = `select * from todo_db.dbo.work where id=${id}`;

    try {
      let result = await executeQuery(Q);
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  }

  async getTodos(req: Request, res: Response, next: NextFunction) {
    const Q = "select * from work";
    try {
      let result = await executeQuery(Q);
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  }

  async postTodo(req: Request, res: Response, next: NextFunction) {
    const {
      body: { name, done }
    } = req;

    const Q = `INSERT INTO work (name, done) VALUES (${String(name)}, ${Boolean(
      done
    )})`;

    console.log("Query", Q);

    try {
      let result = await executeQuery(Q);
      res.send(result);
    } catch (error) {
      console.log("---error---", error);
      res.send(error);
    }
  }

  async updateTodo(req: Request, res: Response, next: NextFunction) {
    const {
      body: { name, done },
      params: { id }
    } = req;
  }

  async deleteTodo(req: Request, res: Response, next: NextFunction) {
    const Q = `DELETE FROM work WHERE id=${req.params.id}`;
    try {
      res.send(await executeQuery(Q));
    } catch (error) {
      res.send(error);
    }
  }
}

export default new TodoController();
