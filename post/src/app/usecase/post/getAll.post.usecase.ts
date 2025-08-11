import { Post } from "../../domain/entity/post/post.entity"
import { PostGateway } from "../../domain/gateway/post/post.gateway"
import { usecase } from "../usecase"

export type GetAllPostInputDto = {
    userId: string
}

export type GetAllPostOutputDto = {
    status: number
    message: string | Post[]
}

export class GetAllPostUsecase implements usecase<GetAllPostInputDto, GetAllPostOutputDto> {

    private constructor(private readonly gateway: PostGateway) { }

    static create(gateway: PostGateway) {
        return new GetAllPostUsecase(gateway)
    }

    execute(input: GetAllPostInputDto): Promise<GetAllPostOutputDto> {
        const response = this.gateway.getAll(input)
        return response
    }

}