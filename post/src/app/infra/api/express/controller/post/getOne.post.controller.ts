import { Request, Response } from "express";
import { GetOnePostInputDto, GetOnePostUsecase } from "../../../../../usecase/post/getOne.post.usecase";
import { getOnePost } from "../../../../../util/validation/post/getOne.post.validation";
import { GetOnePostPresenter } from "../../../../../presenter/post/getOne.post.presenter";


export class GetOnePostController {
    private constructor(private readonly usecase: GetOnePostUsecase) { }

    static create(usecase: GetOnePostUsecase) {
        return new GetOnePostController(usecase)
    }

    execute() {
        return async (req: Request<{}, {}, GetOnePostInputDto>, res: Response) => {
            const params = req.params

            getOnePost.parseAsync(params).then(async (valid) => {
                const data = await this.usecase.execute(valid)
                const { status, message } = GetOnePostPresenter.toHttp(data)
                res.status(status).json(message)
            }).catch(err => res.status(400).json(err))
        }
    }

}