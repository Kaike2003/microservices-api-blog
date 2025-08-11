import { PrismaClient } from "../../../../../generated/prisma";
import { PrismaClientKnownRequestError } from "../../../../../generated/prisma/runtime/library";
import { Auth } from "../../../../domain/entity/auth.entity";
import { AuthGateway, UpdateEmail, UpdateUser } from "../../../../domain/gateway/auth.gateway";
import { publisherSignupRabbitMq } from "../../../../util/rabbitMq/publisher/auth/signup.rabbitMq";
import * as argon from "argon2";
import jwt from "jsonwebtoken";

export class AuthPrismaRepository implements AuthGateway {
  private constructor(private readonly prisma: PrismaClient) { }

  static create(prisma: PrismaClient) {
    return new AuthPrismaRepository(prisma);
  }

  async signup(auth: Auth): Promise<{ message: string; status: number }> {
    const hash = (await argon.hash(auth.hash)) as string;
    try {
      const data = {
        email: auth.email,
        hash,
        createdAt: auth.createdAt,
        updatedAt: auth.updatedAt,
      };
      const user = await this.prisma.user.create({ data });
      await publisherSignupRabbitMq(user);
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

  async signin(email: string, password: string): Promise<{ message?: string; status: number; access_token?: string }> {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) return { status: 404, message: "Credenciais inválidas" };

      const pwMatches = await argon.verify(user.hash, password as string);

      if (!pwMatches) return { status: 404, message: "Credenciais inválidas" };

      return {
        status: 200,
        access_token: (await this.token(user.id, user.email)).access_token,
      };
    } catch (error) {
      return {
        message: error,
        status: 400,
      };
    }
  }

  private async token(userId: string, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = process.env.SECRET as string;

    const token = jwt.sign(
      {
        data: payload,
      },
      secret,
      { expiresIn: "4h" }
    );

    return { access_token: token };
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
