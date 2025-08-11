import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export class Auth {
  private constructor() { }

  static protected() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (token === null) {
          res.status(401).send("Credencias inválidas");
        }

        const secret = process.env.SECRET as string;

        jwt.verify(token as string, secret, (err, user) => {
          if (err) {
            res.status(403).send("Credencias inválidas");
            return;
          }

          next();
        });
      } catch (error) {
        res.status(400).json(error);
      }
    };
  }
}
