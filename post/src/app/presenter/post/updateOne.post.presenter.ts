import { UpdateOnePostOutputDto } from "../../usecase/post/updateOne.post.usecase";

export class UpdateOnePostPresenter {
  private constructor() { }

  static toHttp(output: UpdateOnePostOutputDto) {
    return {
      status: output.status,
      message: output.message,
    };
  }
}
