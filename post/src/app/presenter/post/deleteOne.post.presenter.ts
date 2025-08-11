import { DeleteOnePostOutputDto } from "../../usecase/post/deleteOne.post.usecase";

export class DeleteOnePostPresenter {
  private constructor() { }

  static toHttp(output: DeleteOnePostOutputDto) {
    return {
      status: output.status,
      message: output.message,
    };
  }
}
