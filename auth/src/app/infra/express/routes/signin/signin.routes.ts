import { Router } from "express";
import { AuthPrismaRepository } from "../../../repository/prisma/auth/auth.prisma.repository";
import { prisma } from "../../../../util/prisma/prisma";
import { SigninUseCase } from "../../../../usecase/auth/signin.usecase";
import { SigninController } from "../../controller/signin/signin.controller";

export class SigninRoute {
  private constructor(private readonly app: Router) {}

  static create() {
    return new SigninRoute(Router());
  }

  execute() {
    const repository = AuthPrismaRepository.create(prisma);
    const usecase = SigninUseCase.create(repository);
    const controller = SigninController.create(usecase).execute();
    return this.app.post("/signin", controller);
  }
}
