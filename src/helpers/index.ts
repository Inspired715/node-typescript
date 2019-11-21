import * as sql from "mssql";
import { Request } from "mssql";

export default class IO {
  private request: Request;
  constructor() {
    this.request = new sql.Request();
  }
  get(id: number) {
    this.request.query("");
  }
}
