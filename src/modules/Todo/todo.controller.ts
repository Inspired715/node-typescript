import { Request, Response, NextFunction } from "express";
import * as sql from "mssql";
import { connectDB } from "../../db";
import { executeQuery } from "../../utils";
import HTTP_STATUS from "../../constants/httpStatus";

class TodoController {
  constructor() {}

  async getTodo(req: Request, res: Response, next: NextFunction) {
    const {
      params: { id }
    } = req;

    const Q = `select * from todo_db.dbo.work where id= @id`;

    try {
      connectDB()
        .then(async (conn: any) => {
          const ps = new sql.PreparedStatement(conn);
          ps.input("id", sql.Int);
          ps.prepare(Q, err => {
            ps.execute(
              {
                id
              },
              (err, records) => {
                res.send(HTTP_STATUS.SUCCESS.ok);
              }
            );
          });
        })
        .then(err => {
          throw new Error(`Error connecting ${err}`);
        });
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

    const Q = `INSERT INTO work (name, done) VALUES (@name, @done)`;

    try {
      connectDB()
        .then(async (conn: any) => {
          const ps = new sql.PreparedStatement(conn);
          ps.input("name", sql.VarChar);
          ps.input("done", sql.Bit);

          ps.prepare(Q, err => {
            if (err) throw err;
            ps.execute(
              {
                name,
                done
              },
              (err, records) => {
                if (err) throw err;
                res.send(HTTP_STATUS.SUCCESS.created);
              }
            );
          });
        })
        .then(err => {
          throw new Error(`Error connecting ${err}`);
        });
    } catch (error) {
      res.send(error);
    }
  }

  async updateTodo(req: Request, res: Response, next: NextFunction) {
    const {
      body: { name, done },
      params: { id }
    } = req;

    const Q = `UPDATE work SET name = @name, done=@done WHERE id=@id`;

    try {
      connectDB()
        .then(async (conn: any) => {
          const ps = new sql.PreparedStatement(conn);
          ps.input("id", sql.Int);
          ps.input("name", sql.VarChar);
          ps.input("done", sql.Bit);
          ps.prepare(Q, err => {
            ps.execute(
              {
                id
              },
              (err, records) => {
                res.send(records);
              }
            );
          });
        })
        .then(err => {
          throw new Error(`Error connecting ${err}`);
        });
    } catch (error) {
      res.send(error);
    }
  }

  async deleteTodo(req: Request, res: Response, next: NextFunction) {
    const {
      params: { id }
    } = req;
    const Q = `DELETE FROM work WHERE id=@id`;
    try {
      connectDB()
        .then(async (conn: any) => {
          const ps = new sql.PreparedStatement(conn);
          ps.input("id", sql.Int);
          ps.prepare(Q, err => {
            ps.execute(
              {
                id
              },
              (err, records) => {
                res.send(records);
              }
            );
          });
        })
        .then(err => {
          throw new Error(`Error connecting ${err}`);
        });
    } catch (error) {
      res.send(error);
    }
  }
}

export default new TodoController();
