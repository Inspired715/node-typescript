import * as sql from "mssql";

const config = {
  dev: {
    user: "sa",
    password: "stack123",
    server: "localhost",
    port: 1433,
    database: "todo_db"
  },
  staging: {},
  prod: {}
};

export const connectDB = () => {
  let pool = null;
  if (pool) return pool;

  return new Promise(async (resolve, reject) => {
    try {
      const connection = new sql.ConnectionPool(config.dev);

      connection
        .connect()
        .then(connPool => {
          resolve(connPool);
        })
        .catch(err => {
          pool = null;
          reject(err);
        });

      connection.on("close", () => {
        pool = null;
      });
    } catch (error) {
      console.log("Error", error);
    }
  });
};

export const connection = () => connectDB();
