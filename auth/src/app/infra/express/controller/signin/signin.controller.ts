import { SignupInputDto } from "../../../../usecase/auth/signup.usecase";
import { Request, Response } from "express";
import { SigninUseCase } from "../../../../usecase/auth/signin.usecase";
import { SigninPresenter } from "../../../../presenter/signin/signin.presenter";
import { signin } from "../../../../validation/signin/signin.validation";

export class SigninController {
  private constructor(private readonly usecase: SigninUseCase) {}

  public static create(usecase: SigninUseCase) {
    return new SigninController(usecase);
  }

  public execute() {
    return async (req: Request<{}, {}, SignupInputDto>, res: Response) => {
      try {
        const body = req.body;
        await signin
          .parseAsync(body)
          .then(async (suc) => {
            const response = await this.usecase.execute(suc);
            const toHttp = SigninPresenter.toHttp(response);

            if (!toHttp.access_token) res.status(toHttp.status).json(toHttp.message);

            res.status(toHttp.status).json(toHttp.access_token);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      } catch (error) {
        res.status(400).json(error.message);
      }
    };
  }
}
