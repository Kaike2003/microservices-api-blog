import { Router } from "express";
import { UserPrismaRepository } from "../../../repository/prisma/user/user.prisma.repository";
import { prisma } from "../../../../../util/prisma/prisma"
import { UpdateEmailUsecase } from "../../../../../usecase/user/updatePassword.uscase copy";
import { UpdateEmailController } from "../../controller/user/updateEmail.controller";


export class UpdateEmailRoute {

    private constructor(private readonly app: Router) { }

    static create() {
        return new UpdateEmailRoute(Router())
    }

    execute() {
        const repository = UserPrismaRepository.create(prisma)
        const usacase = UpdateEmailUsecase.create(repository)
        const controller = UpdateEmailController.create(usacase).execute()
        return this.app.put("/updateemail", controller)
    }
}