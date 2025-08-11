import { Post } from "../../domain/entity/post/post.entity";
import { usecase } from "../usecase";
import { PostGateway } from './../../domain/gateway/post/post.gateway';

export type CreatePostInputDto = {
    title: string
    description: string
    userId: string
}

export type CreatePostOutputDto = {
    status: number
    message: string
}


export class CreatePostUsecase implements usecase<CreatePostInputDto, CreatePostOutputDto> {

    private constructor(private readonly gateway: PostGateway) { }

    static create(gateway: PostGateway) {
        return new CreatePostUsecase(gateway)
    }

    async execute(input: CreatePostInputDto): Promise<CreatePostOutputDto> {
        const post = Post.create(input)
        const response = await this.gateway.create(post)
        return response
    }

}