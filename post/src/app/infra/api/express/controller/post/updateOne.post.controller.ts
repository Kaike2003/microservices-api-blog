import { Request, Response } from "express";
import { GetOnePostPresenter } from "../../../../../presenter/post/getOne.post.presenter";
import { UpdateOnePostInputDto, UpdateOnePostUsecase } from "../../../../../usecase/post/updateOne.post.usecase";
import { updateOnePost } from "../../../../../util/validation/post/updateOne.post.validation";


export class UpdateOnePostController {
    private constructor(private readonly usecase: UpdateOnePostUsecase) { }

    static create(usecase: UpdateOnePostUsecase) {
        return new UpdateOnePostController(usecase)
    }

    execute() {
        return async (req: Request<UpdateOnePostInputDto, {}, UpdateOnePostInputDto>, res: Response) => {
            const params = req.params
            const body = req.body

            const r = {
                id: params.id,
                userId: params.userId,
                title: body.title,
                description: body.description
            }

            updateOnePost.parseAsync(r).then(async (valid) => {
                const data = await this.usecase.execute(valid)
                const { status, message } = GetOnePostPresenter.toHttp(data)
                res.status(status).json(message)
            }).catch(err => res.status(400).json(err))
        }
    }

}