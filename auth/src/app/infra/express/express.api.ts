import { Api } from "../api";
import express, { Express } from "express";
import { SignupRoute } from "./routes/signup/signup.routes";
import morgan from "morgan";
import cors from "cors";
import { SigninRoute } from "./routes/signin/signin.routes";
import "dotenv/config";

export class ExpressApi implements Api {
  private constructor(private readonly app: Express) {}

  public static create() {
    const app: Express = express();
    this.middlewares(app);
    this.routes(app);
    return new ExpressApi(app);
  }

  private static routes(app: Express) {
    const signupRoute = SignupRoute.create().execute();
    const signinRoute = SigninRoute.create().execute();
    app.use(signupRoute, signinRoute);
  }

  private static middlewares(app: Express) {
    app.use(express.json());
    app.use(cors());
    app.use(morgan("dev"));
  }

  listen(port: number): void {
    this.app.listen(port, () => console.log(`Server running on: http://localhost:81`));
  }
}
