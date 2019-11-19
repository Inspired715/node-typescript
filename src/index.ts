import { Application } from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import Routes from "./routes";
import { connectDB } from "./db/index";

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  public config(app: Application): void {
    connectDB();
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
  }
}
