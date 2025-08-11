import * as argon from "argon2";
import jwt from "jsonwebtoken";
import { UpdateEmail, UpdateUser, UserGateway } from "../../../../../domain/gateway/user/user.gateway";
import { User } from "../../../../../domain/entity/user/user.entity";
import { PrismaClient } from "../../../../../../generated/prisma";
import { PrismaClientKnownRequestError } from "../../../../../../generated/prisma/runtime/library";


export class UserPrismaRepository implements UserGateway {
  private constructor(private readonly prisma: PrismaClient) { }

  static create(prisma: PrismaClient) {
    return new UserPrismaRepository(prisma);
  }

  async signup(auth: User): Promise<{ message: string; status: number }> {
    try {
      const data = {
        id: auth.id,
        email: auth.email,
        hash: auth.hash,
        createdAt: auth.createdAt,
        updatedAt: auth.updatedAt,
      };
      const user = await this.prisma.user.create({ data });

      return {
        status: 201,
        message: "Conta criada com sucesso",
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return {
            message: `Este email já está sendo utilizado`,
            status: 403,
          };
        }
      }

      return {
        status: 400,
        message: error,
      };
    }
  }





  async updatePassword(dto: UpdateUser): Promise<{ message: string; status: number; }> {
    try {
      console.log(dto)
      const user = await this.prisma.user.findUnique({ where: { email: dto.email } })

      if (!user) return { status: 404, message: "Credenciais inválidas" }

      const hash = await argon.verify(user.hash, dto.oldPassword)

      if (!hash) return { message: "Password incorreta", status: 404 }

      const newHash = await argon.hash(dto.newPassword)

      await this.prisma.user.update({
        where: {
          email: dto.email
        },
        data: {
          hash: newHash
        }
      })

      return {
        message: "Password atualizada com sucesso",
        status: 200
      }


    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        return {
          message: error.message,
          status: 404
        }
      }

      return {
        message: error.message,
        status: 404
      }
    }

  }

  async updateEmail(dto: UpdateEmail): Promise<{ message: string; status: number; }> {
    try {
      const user = await this.prisma.user.findUnique({ where: { email: dto.oldEmail } })

      if (!user) return { status: 404, message: "Credenciais inválidas" }

      await this.prisma.user.update({
        where: {
          email: dto.oldEmail
        },
        data: {
          email: dto.newEmail
        }
      })

      return {
        message: "Email atualizada com sucesso",
        status: 200
      }


    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        return {
          message: error.message,
          status: 404
        }
      }

      return {
        message: error.message,
        status: 404
      }
    }

  }
}
