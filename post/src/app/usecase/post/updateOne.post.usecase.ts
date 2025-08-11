import { PostGateway } from "../../domain/gateway/post/post.gateway"
import { usecase } from "../usecase"

export type UpdateOnePostInputDto = {
    id: string
    title: string
    description: string
    userId: string
}

export type UpdateOnePostOutputDto = {
    status: number
    message: string
}

export class UpdateOnePostUsecase implements usecase<UpdateOnePostInputDto, UpdateOnePostOutputDto> {

    private constructor(private readonly gateway: PostGateway) { }

    static create(gateway: PostGateway) {
        return new UpdateOnePostUsecase(gateway)
    }

    execute(input: UpdateOnePostInputDto): Promise<UpdateOnePostOutputDto> {
        const response = this.gateway.updateOne(input)
        return response
    }

}