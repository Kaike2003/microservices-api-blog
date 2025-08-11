import { Router } from "express"
import { PostPrismaRepository } from "../../../repository/prisma/post/post.prisma.repository"
import { prisma } from "../../../../../util/prisma/prisma"
import { UpdateOnePostUsecase } from "../../../../../usecase/post/updateOne.post.usecase"
import { UpdateOnePostController } from "../../controller/post/updateOne.post.controller"

export class UpdateOnePostRoutes {
    private constructor(private readonly app: Router) { }

    static create() {
        return new UpdateOnePostRoutes(Router())
    }

    execute() {
        const repository = PostPrismaRepository.create(prisma)
        const usecase = UpdateOnePostUsecase.create(repository)
        const controller = UpdateOnePostController.create(usecase).execute()
        return this.app.put("/:id/:userId", controller)
    }
}