import { PrismaClient } from "../../../../../../generated/prisma";
import { PrismaClientKnownRequestError } from "../../../../../../generated/prisma/runtime/library";

import { Post } from "../../../../../domain/entity/post/post.entity";
import { PostGateway } from "../../../../../domain/gateway/post/post.gateway";


export class PostPrismaRepository implements PostGateway {

    private constructor(private readonly prisma: PrismaClient) { }

    static create(prisma: PrismaClient): PostPrismaRepository {
        return new PostPrismaRepository(prisma)
    }

    async create(dto: Post): Promise<{ message: string; status: number; }> {
        const id = dto.userId

        const user = await this.prisma.user.findUnique({ where: { id } })

        if (!user) return { status: 404, message: "Credenciais inválidas" }

        const data = {
            userId: id,
            title: dto.title,
            description: dto.description,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt
        }

        await this.prisma.post.create({
            data: {
                title: data.title,
                description: data.description,
                userId: dto.userId,
                createdAt: dto.createdAt,
                updatedAt: dto.updatedAt
            }
        })

        return {
            status: 201,
            message: "Post criado com sucesso"
        }

    }

    async deleteOne(dto: Pick<Post, "id">): Promise<{ message: string; status: number; }> {
        const id = dto.id
        try {
            const post = await this.prisma.post.findUnique({ where: { id } })

            if (!post) return { status: 404, message: "Post inválido" }

            await this.prisma.post.delete({ where: { id } })

            return {
                message: "Post deletado com sucesso",
                status: 200
            }

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                return {
                    status: 403,
                    message: error.message
                }
            }

            return {
                status: 400,
                message: error
            }
        }



    }

    async deleteAll(dto: Pick<Post, "userId">): Promise<{ message: string; status: number; }> {
        const id = dto.userId
        try {
            const user = await this.prisma.user.findUnique({ where: { id } })

            if (!user) return { status: 404, message: "Credenciais inválidas" }

            await this.prisma.post.deleteMany({ where: { userId: user.id } })

            return {
                message: "Posts deletado com sucesso",
                status: 200
            }

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                return {
                    status: 403,
                    message: error.message
                }
            }

            return {
                status: 400,
                message: error
            }
        }



    }

    async getAll(dto: Pick<Post, "userId">): Promise<{ message: string | Post[]; status: number; }> {
        const id = dto.userId
        try {
            const user = await this.prisma.user.findUnique({ where: { id } })

            if (!user) return { status: 404, message: "Credenciais inválidas" }

            const data = await this.prisma.post.findMany({ where: { userId: user.id } })

            const posts = data.map((p) => {
                const post = Post.with({
                    id: p.id,
                    createdAt: p.createdAt,
                    updatedAt: p.updatedAt,
                    description: p.description,
                    title: p.title,
                    userId: p.userId as string
                })

                return post
            })

            return {
                message: posts,
                status: 200
            }

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                return {
                    status: 403,
                    message: error.message
                }
            }

            return {
                status: 400,
                message: error
            }
        }


    }

    async getOne(dto: Pick<Post, "id" | "userId">): Promise<{ message: string | Post; status: number; }> {
        const id = dto.id
        try {
            const post = await this.prisma.post.findUnique({ where: { id } })

            if (!post) return { status: 404, message: "Post inválido" }

            const data = Post.with({
                id: post.id,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
                title: post.title,
                description: post.description,
                userId: post.userId as string
            })

            return {
                message: data,
                status: 200
            }

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                return {
                    status: 403,
                    message: error.message
                }
            }

            return {
                status: 400,
                message: error
            }
        }


    }

    async updateOne(dto: Pick<Post, "id" | "title" | "description" | "userId">): Promise<{ message: string; status: number; }> {
        const id = dto.userId
        try {
            const user = await this.prisma.user.findUnique({ where: { id } })

            if (!user) return { status: 404, message: "Credenciais inválidas" }

            const post = await this.prisma.post.findUnique({ where: { id: dto.id } })

            if (!post) return { status: 404, message: "Post inválido" }

            await this.prisma.post.update({
                where: { id: dto.id },
                data: {
                    title: dto.title,
                    description: dto.description
                }
            })

            return {
                message: "Post atualizado com sucesso",
                status: 200
            }

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                return {
                    status: 403,
                    message: error.message
                }
            }

            return {
                status: 400,
                message: error
            }
        }



    }





}