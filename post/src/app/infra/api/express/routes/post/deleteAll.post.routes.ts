import { Router } from "express";
import { PostPrismaRepository } from "../../../repository/prisma/post/post.prisma.repository";
import { prisma } from "../../../../../util/prisma/prisma";
import { DeleteAllPostUsecase } from "../../../../../usecase/post/deleteAll.post.usecase";
import { DeleteAllPostController } from "../../controller/post/deleteAll.post.controller";


export class DeleteAllPostRoutes {
    private constructor(private readonly app: Router) { }

    static create() {
        return new DeleteAllPostRoutes(Router())
    }

    execute() {
        const repository = PostPrismaRepository.create(prisma)
        const usecase = DeleteAllPostUsecase.create(repository)
        const controller = DeleteAllPostController.create(usecase).execute()
        return this.app.delete("/all/:userId", controller)
    }

}