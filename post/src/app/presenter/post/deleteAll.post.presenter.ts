import { DeleteAllPostOutputDto } from "../../usecase/post/deleteAll.post.usecase";

export class DeleteAllPostPresenter {
  private constructor() { }

  static toHttp(output: DeleteAllPostOutputDto) {
    return {
      status: output.status,
      message: output.message,
    };
  }
}
