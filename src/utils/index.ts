import * as sql from "mssql";
import { connectDB as connPool } from "../db/index";

export const executeQuery = (Q: string) => {
  return new Promise((resolve, reject) => {
    connPool()
      .then(async (conn: any) => {
        const exec = await conn.request();
        resolve(exec.query(Q));
      })
      .catch(err => reject(err));
  });
};
