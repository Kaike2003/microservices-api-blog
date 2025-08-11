import express, { Express, Response, Request } from "express";
import { Api } from "../api";
import cors from "cors";
import morgan from "morgan";
import { UpdatePasswordRoute } from "./routes/user/updatePassword.routes";
import { UpdateEmailRoute } from "./routes/user/updateEmail.routes";

export class ExpressApi implements Api {
  private constructor(private readonly app: Express) { }

  static create() {
    const app: Express = express();
    this.middlewares(app);
    this.routes(app);
    return new ExpressApi(app);
  }

  private static middlewares(app: Express) {
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(cors());
  }

  private static routes(app: Express) {
    const updatePassword = UpdatePasswordRoute.create().execute()
    const updateEmail = UpdateEmailRoute.create().execute()
    app.use(updatePassword, updateEmail)
  }

  listen(port: number): void {
    this.app.listen(port, () => console.log(`Server running on: http://localhost:82`));
  }
}
