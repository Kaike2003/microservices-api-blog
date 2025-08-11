import { Api } from "../api";
import express, { Express } from "express";
import proxy from "express-http-proxy";
import morgan from "morgan";
import cors from "cors";
import { Auth } from "./middleware/auth/auth";
import "dotenv/config";
import { rateLimit } from 'express-rate-limit'

export class ExpressApi implements Api {
  private constructor(private readonly app: Express) { }

  public static create() {
    const app: Express = express();
    this.middlewares(app);
    this.services(app);
    return new ExpressApi(app);
  }

  private static middlewares(app: Express) {
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 100,
      standardHeaders: 'draft-8',
      legacyHeaders: false,
      ipv6Subnet: 56,
    })
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(cors());
    app.use(limiter)
  }

  private static services(app: Express) {
    app.use("/auth", proxy("http://localhost:81"));
    app.use("/user", Auth.protected(), proxy("http://localhost:82"));
    app.use("/post", Auth.protected(), proxy("http://localhost:83"));
  }

  listen(port: number): void {
    this.app.listen(port, () => console.log(`Server running on: http://localhost:80`));
  }
}
