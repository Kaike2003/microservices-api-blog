import { SigninOutputDto } from "../../usecase/auth/signin.usecase";

export class SigninPresenter {
  private constructor() {}

  static toHttp(output: SigninOutputDto) {
    return {
      status: output.status,
      message: output.message,
      access_token: output.access_token,
    };
  }
}
