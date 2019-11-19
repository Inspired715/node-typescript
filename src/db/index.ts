const sql = require("mssql");

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
  (async () => {
    try {
      let pool = await sql.connect(config.dev);
      const result = await sql.query`select * from work`;
      console.dir(result);
    } catch (err) {
      console.log("Error", err);
    }
  })();
};
