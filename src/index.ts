import { Application } from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import Routes from "./routes";
import { connectDB } from "./db/index";

export default class Server {
  constructor(app: Application) {
    this.db();
    this.config(app);
    new Routes(app);
  }

  // express configuration
  public config(app: Application): void {
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
  }

  // initial database connection
  public db(): void {
    connectDB()
      .then(res => {
        console.log("database connected", res);
      })
      .catch(err => console.log("error connectiong db", err));
  }
}
