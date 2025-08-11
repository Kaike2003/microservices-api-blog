import { Request, Response } from "express";
import { GetAllPostInputDto, GetAllPostUsecase } from "../../../../../usecase/post/getAll.post.usecase";
import { getAllPost } from "../../../../../util/validation/post/getAll.post.validation";
import { GetAllPostPresenter } from "../../../../../presenter/post/getAll.post.presenter";


export class GetAllPostController {
    private constructor(private readonly usecase: GetAllPostUsecase) { }

    static create(usecase: GetAllPostUsecase) {
        return new GetAllPostController(usecase)
    }

    execute() {
        return async (req: Request<GetAllPostInputDto>, res: Response) => {
            const params = req.params

            getAllPost.parseAsync(params).then(async (valid) => {
                const data = await this.usecase.execute(valid)
                const { status, message } = GetAllPostPresenter.toHttp(data)
                res.status(status).json(message)
            }).catch(err => res.status(400).json(err))
        }
    }

}