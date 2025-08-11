import { Router } from "express";
import { PostPrismaRepository } from "../../../repository/prisma/post/post.prisma.repository";
import { prisma } from "../../../../../util/prisma/prisma";
import { GetAllPostUsecase } from "../../../../../usecase/post/getAll.post.usecase";
import { GetAllPostController } from "../../controller/post/getAll.post.controller";


export class GetAllPostRoute {
    private constructor(private readonly app: Router) { }

    static create() {
        return new GetAllPostRoute(Router())
    }

    execute() {
        const repository = PostPrismaRepository.create(prisma)
        const usecase = GetAllPostUsecase.create(repository)
        const controller = GetAllPostController.create(usecase).execute()
        return this.app.get("/:userId", controller)
    }

}