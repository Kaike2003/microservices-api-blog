import { Post } from "../../domain/entity/post/post.entity"
import { PostGateway } from "../../domain/gateway/post/post.gateway"
import { usecase } from "../usecase"


export type GetOnePostInputDto = {
    id: string
    userId: string
}

export type GetOnePostOutputDto = {
    status: number
    message: string | Post
}

export class GetOnePostUsecase implements usecase<GetOnePostInputDto, GetOnePostOutputDto> {

    private constructor(private readonly gateway: PostGateway) { }

    static create(gateway: PostGateway) {
        return new GetOnePostUsecase(gateway)
    }

    execute(input: GetOnePostInputDto): Promise<GetOnePostOutputDto> {
        const response = this.gateway.getOne(input)
        return response
    }

}