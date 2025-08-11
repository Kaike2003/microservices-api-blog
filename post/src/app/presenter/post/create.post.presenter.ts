import { CreatePostOutputDto } from "../../usecase/post/create.post.usecase";

export class CreatePostPresenter {
  private constructor() { }

  static toHttp(output: CreatePostOutputDto) {
    return {
      status: output.status,
      message: output.message,
    };
  }
}
