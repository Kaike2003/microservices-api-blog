import { GetOnePostOutputDto } from "../../usecase/post/getOne.post.usecase";

export class GetOnePostPresenter {
  private constructor() { }

  static toHttp(output: GetOnePostOutputDto) {
    return {
      status: output.status,
      message: output.message,
    };
  }
}
