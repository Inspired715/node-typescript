const sql = require("mssql");

export const executeQuery = (req: string) => {
  return new Promise((resolve, reject) => {
    const request = new sql.Request();
    return request.query(req, (err: Error, resp: unknown) => {
      if (err) reject(err);
      resolve(resp);
    });
  });
};
