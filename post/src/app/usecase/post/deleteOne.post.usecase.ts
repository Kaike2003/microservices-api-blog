import { PostGateway } from "../../domain/gateway/post/post.gateway"
import { usecase } from "../usecase"

export type DeleteOnePostInputDto = {
    id: string
}

export type DeleteOnePostOutputDto = {
    status: number
    message: string
}

export class DeleteOnePostUsecase implements usecase<DeleteOnePostInputDto, DeleteOnePostOutputDto> {

    private constructor(private readonly gateway: PostGateway) { }

    static create(gateway: PostGateway) {
        return new DeleteOnePostUsecase(gateway)
    }

    execute(input: DeleteOnePostInputDto): Promise<DeleteOnePostOutputDto> {
        const response = this.gateway.deleteOne(input)
        return response
    }

}