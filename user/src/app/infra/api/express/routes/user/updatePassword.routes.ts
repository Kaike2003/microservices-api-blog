import { Router } from "express";
import { UserPrismaRepository } from "../../../repository/prisma/user/user.prisma.repository";
import { prisma } from "../../../../../util/prisma/prisma"
import { UpdatePasswordUsecase } from "../../../../../usecase/user/updatePassword.uscase";
import { UpdatePasswordController } from "../../controller/user/updatePassword.controller";


export class UpdatePasswordRoute {

    private constructor(private readonly app: Router) { }

    static create() {
        return new UpdatePasswordRoute(Router())
    }

    execute() {
        const repository = UserPrismaRepository.create(prisma)
        const usacase = UpdatePasswordUsecase.create(repository)
        const controller = UpdatePasswordController.create(usacase).execute()
        return this.app.put("/updatepassword", controller)
    }
}