import express, { Application } from "express";
import dotenv from "dotenv";

import Server from "./src/index";

const app: Application = express();
dotenv.config();
new Server(app);
const port = 3001;

app.listen(port, "localhost", function(err: any) {
  if (err) return err;
  console.info(`Server running on : http://localhost:${port}`);
});
