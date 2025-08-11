import { Router } from "express";
import { PostPrismaRepository } from "../../../repository/prisma/post/post.prisma.repository";
import { prisma } from "../../../../../util/prisma/prisma";
import { DeleteOnePostUsecase } from "../../../../../usecase/post/deleteOne.post.usecase";
import { DeleteOnePostController } from "../../controller/post/deleteOne.post.controller";


export class DeleteOnePostRoutes {
    private constructor(private readonly app: Router) { }

    static create() {
        return new DeleteOnePostRoutes(Router())
    }

    execute() {
        const repository = PostPrismaRepository.create(prisma)
        const usecase = DeleteOnePostUsecase.create(repository)
        const controller = DeleteOnePostController.create(usecase).execute()
        return this.app.delete("/:id", controller)
    }

}