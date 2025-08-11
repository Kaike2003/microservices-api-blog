import { Router } from "express";
import { CreatePostController } from "../../controller/post/create.post.controller";
import { prisma } from "../../../../../util/prisma/prisma"
import { PostPrismaRepository } from "../../../repository/prisma/post/post.prisma.repository";
import { CreatePostUsecase } from "../../../../../usecase/post/create.post.usecase";

export class CreatePostRoute {
    private constructor(private readonly app: Router) { }

    static create() {
        return new CreatePostRoute(Router())
    }

    execute() {
        const repository = PostPrismaRepository.create(prisma)
        const usecase = CreatePostUsecase.create(repository)
        const controller = CreatePostController.create(usecase).execute()
        return this.app.post("/", controller)
    }

}