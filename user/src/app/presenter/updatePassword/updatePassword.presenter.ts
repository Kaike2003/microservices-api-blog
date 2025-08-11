import { UpdateOutputDto } from "../../usecase/user/updatePassword.uscase";

export class UpdatePasswordPresenter {
  private constructor() { }

  static toHttp(output: UpdateOutputDto) {
    return {
      status: output.status,
      message: output.message,
    };
  }
}
