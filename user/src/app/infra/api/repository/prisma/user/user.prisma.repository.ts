import { PrismaClient } from "../../../../../../generated/prisma";
import { PrismaClientKnownRequestError } from "../../../../../../generated/prisma/runtime/library";
import { User } from "../../../../../domain/entity/user.entity";
import { UpdateEmail, UpdateUser, UserGateway } from "../../../../../domain/gateway/user.gateway";
import * as argon from "argon2"
import { publihserUpdatePasswordRabbitMq } from "../../../../../util/rabbitMq/publisher/updatePassword/updatePassword.rabbitMq";
import { publihserUpdateEmailRabbitMq } from "../../../../../util/rabbitMq/publisher/updateEmail/updateEmailrabbitMq";


export class UserPrismaRepository implements UserGateway {
  private constructor(private readonly prisma: PrismaClient) { }

  static create(prisma: PrismaClient) {
    return new UserPrismaRepository(prisma);
  }

  async signup(user: User): Promise<{ message: string; status: number }> {
    try {
      const res = User.create(user);

      const data = {
        id: res.id,
        email: res.email,
        hash: res.hash,
        createdAt: res.createdAt,
        updatedAt: res.updatedAt,
      };

      await this.prisma.user.create({ data });

      return { status: 201, message: "Conta criada com sucesso" };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        return {
          message: error.code,
          status: 403,
        };
      }

      return { status: 404, message: error };
    }
  }

  async updatePassword(dto: UpdateUser): Promise<{ message: string; status: number; }> {
    try {
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

      await publihserUpdatePasswordRabbitMq(dto)

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

      await publihserUpdateEmailRabbitMq(dto)

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
