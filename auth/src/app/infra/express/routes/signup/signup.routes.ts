import { Router } from "express";
import { AuthPrismaRepository } from "../../../repository/prisma/auth/auth.prisma.repository";
import { prisma } from "../../../../util/prisma/prisma";
import { SignupUseCase } from "../../../../usecase/auth/signup.usecase";
import { SignupController } from "../../controller/signup/signup.controller";

export class SignupRoute {
  private constructor(private readonly app: Router) {}

  static create() {
    return new SignupRoute(Router());
  }

  execute() {
    const repository = AuthPrismaRepository.create(prisma);
    const usecase = SignupUseCase.create(repository);
    const controller = SignupController.create(usecase).execute();
    return this.app.post("/signup", controller);
  }
}
