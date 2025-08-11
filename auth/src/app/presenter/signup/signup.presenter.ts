import { SignupOutputDto } from "../../usecase/auth/signup.usecase";

export class SignupPresenter {
  private constructor() {}

  static toHttp(output: SignupOutputDto) {
    return {
      status: output.status,
      message: output.message,
    };
  }
}
