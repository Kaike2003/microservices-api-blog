import { GetAllPostOutputDto } from "../../usecase/post/getAll.post.usecase";

export class GetAllPostPresenter {
  private constructor() { }

  static toHttp(output: GetAllPostOutputDto) {
    return {
      status: output.status,
      message: output.message,
    };
  }
}
