import { Request, Response, Router } from "express"
import { getOnePost } from "../../../../../util/validation/post/getOne.post.validation"
import { PostPrismaRepository } from "../../../repository/prisma/post/post.prisma.repository"
import { prisma } from "../../../../../util/prisma/prisma"
import { GetOnePostUsecase } from "../../../../../usecase/post/getOne.post.usecase"
import { GetOnePostController } from "../../controller/post/getOne.post.controller"

export class GetOnePostRoutes {
    private constructor(private readonly app: Router) { }

    static create() {
        return new GetOnePostRoutes(Router())
    }

    execute() {
        const repository = PostPrismaRepository.create(prisma)
        const usecase = GetOnePostUsecase.create(repository)
        const controller = GetOnePostController.create(usecase).execute()
        return this.app.get("/:id/:userId", controller)
    }
}