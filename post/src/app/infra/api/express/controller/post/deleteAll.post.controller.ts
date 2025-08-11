import { Request, Response } from "express";
import { GetAllPostInputDto } from "../../../../../usecase/post/getAll.post.usecase";
import { getAllPost } from "../../../../../util/validation/post/getAll.post.validation";
import { DeleteAllPostUsecase } from "../../../../../usecase/post/deleteAll.post.usecase";
import { DeleteAllPostPresenter } from "../../../../../presenter/post/deleteAll.post.presenter";
import { deleteAllPost } from "../../../../../util/validation/post/deleteAll.post.validation";


export class DeleteAllPostController {
    private constructor(private readonly usecase: DeleteAllPostUsecase) { }

    static create(usecase: DeleteAllPostUsecase) {
        return new DeleteAllPostController(usecase)
    }

    execute() {
        return async (req: Request<GetAllPostInputDto>, res: Response) => {
            const params = req.params
            deleteAllPost.parseAsync(params).then(async (valid) => {
                const data = await this.usecase.execute(valid)
                const { status, message } = DeleteAllPostPresenter.toHttp(data)
                res.status(status).json(message)
            }).catch(err => res.status(400).json(err))
        }
    }

}