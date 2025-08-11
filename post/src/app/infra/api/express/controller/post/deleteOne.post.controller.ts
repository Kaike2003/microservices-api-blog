import { Request, Response } from "express";
import { DeleteOnePostInputDto, DeleteOnePostUsecase } from "../../../../../usecase/post/deleteOne.post.usecase";
import { DeleteOnePostPresenter } from './../../../../../presenter/post/deleteOne.post.presenter';
import { deleteOnePost } from "../../../../../util/validation/post/deleteOne.post.validation";


export class DeleteOnePostController {
    private constructor(private readonly usecase: DeleteOnePostUsecase) { }

    static create(usecase: DeleteOnePostUsecase) {
        return new DeleteOnePostController(usecase)
    }

    execute() {
        return async (req: Request<DeleteOnePostInputDto>, res: Response) => {
            const params = req.params
            deleteOnePost.parseAsync(params).then(async (valid) => {
                const data = await this.usecase.execute(valid)
                const { status, message } = DeleteOnePostPresenter.toHttp(data)
                res.status(status).json(message)
            }).catch(err => res.status(400).json(err))
        }
    }

}