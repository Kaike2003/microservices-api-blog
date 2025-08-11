import { UpdateInputDto, UpdatePasswordUsecase } from "../../../../../usecase/user/updatePassword.uscase";
import { Request, Response } from "express"
import { updatePassword } from "../../../../../util/validation/user/updateEmailvalidation";
import { UpdatePasswordPresenter } from "../../../../../presenter/updatePassword/updatePassword.presenter";

export class UpdatePasswordController {

    private constructor(private readonly usecase: UpdatePasswordUsecase) { }

    static create(usecase: UpdatePasswordUsecase) {
        return new UpdatePasswordController(usecase)
    }

    execute() {
        return async (req: Request<{}, {}, UpdateInputDto>, res: Response) => {
            try {
                const body = req.body
                updatePassword.parseAsync(body).then(async (valid) => {
                    const data = await this.usecase.execute(valid)
                    const response = UpdatePasswordPresenter.toHttp(data)
                    const { message, status } = response
                    res.status(status).json(message)
                }).catch((e) => {
                    res.status(404).json(e)
                })
            } catch (error) {
                res.status(404).json(error)
            }
        }
    }

}