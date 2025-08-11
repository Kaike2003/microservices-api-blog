import { CreatePostInputDto, CreatePostUsecase } from "../../../../../usecase/post/create.post.usecase";
import { Request, Response } from "express"
import { createPost } from "../../../../../util/validation/post/create.post.validation";
import { CreatePostPresenter } from "../../../../../presenter/post/create.post.presenter";

export class CreatePostController {

    private constructor(private readonly uscase: CreatePostUsecase) { }

    static create(usecase: CreatePostUsecase) {
        return new CreatePostController(usecase)
    }

    execute() {
        return async (req: Request<{}, {}, CreatePostInputDto>, res: Response) => {
            const body = req.body
            createPost.parseAsync(body).then(async (valid) => {
                const data = await this.uscase.execute(valid)
                const { message, status } = CreatePostPresenter.toHttp(data)
                res.status(status).json(message)
            }).catch((err) => res.status(400).json(err))

        }
    }
}