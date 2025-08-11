import { UpdateInputDto, UpdatePasswordUsecase } from "../../../../../usecase/user/updatePassword.uscase";
import { Request, Response } from "express"
import { updatePassword } from "../../../../../util/validation/user/updateEmailvalidation";
import { UpdatePasswordPresenter } from "../../../../../presenter/updatePassword/updatePassword.presenter";
import { UpdateEmailInputDto, UpdateEmailUsecase } from "../../../../../usecase/user/updatePassword.uscase copy";
import { updateEmail } from "../../../../../util/validation/user/updatePassword.validation";
import { UpdateEmailPresenter } from "../../../../../presenter/updateEmail/updateEmailpresenter";

export class UpdateEmailController {

    private constructor(private readonly usecase: UpdateEmailUsecase) { }

    static create(usecase: UpdateEmailUsecase) {
        return new UpdateEmailController(usecase)
    }

    execute() {
        return async (req: Request<{}, {}, UpdateEmailInputDto>, res: Response) => {
            try {
                const body = req.body
                updateEmail.parseAsync(body).then(async (valid) => {
                    const data = await this.usecase.execute(valid)
                    const response = UpdateEmailPresenter.toHttp(data)
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