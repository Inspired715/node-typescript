const sql = require("mssql");

export const executeQuery = (Q: string) => {
  return new Promise((resolve, reject) => {
    const request = new sql.Request();
    return request.query(Q, (err: Error, resp: unknown) => {
      if (err) reject(err);
      resolve(resp);
    });
  });
};
