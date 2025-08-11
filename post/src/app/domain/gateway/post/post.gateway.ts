import { Post } from "../../entity/post/post.entity";


export interface PostGateway {
    create(dto: Post): Promise<{ message: string, status: number }>
    updateOne(dto: Pick<Post, "id" | "title" | "description" | "userId">): Promise<{ message: string, status: number }>
    getOne(dto: Pick<Post, "id" | "userId">): Promise<{ message: string | Post, status: number }>
    getAll(dto: Pick<Post, "userId">): Promise<{ message: string | Post[], status: number }>
    deleteOne(dto: Pick<Post, "id">): Promise<{ message: string, status: number }>
    deleteAll(dto: Pick<Post, "userId">): Promise<{ message: string, status: number }>
}