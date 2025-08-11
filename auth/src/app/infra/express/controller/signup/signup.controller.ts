import { SignupInputDto, SignupUseCase } from "../../../../usecase/auth/signup.usecase";
import { Request, Response } from "express";
import { signup } from "../../../../validation/signup/signup.validation";
import { SignupPresenter } from "../../../../presenter/signup/signup.presenter";

export class SignupController {
  private constructor(private readonly usecase: SignupUseCase) {}

  public static create(usecase: SignupUseCase) {
    return new SignupController(usecase);
  }

  public execute() {
    return async (req: Request<{}, {}, SignupInputDto>, res: Response) => {
      try {
        const body = req.body;
        await signup
          .parseAsync(body)
          .then(async (suc) => {
            const response = await this.usecase.execute(suc);
            const toHttp = SignupPresenter.toHttp(response);
            res.status(toHttp.status).json(toHttp.message);
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
