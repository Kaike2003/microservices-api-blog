import { PostGateway } from "../../domain/gateway/post/post.gateway"
import { usecase } from "../usecase"

export type DeleteAllPostInputDto = {
    userId: string
}

export type DeleteAllPostOutputDto = {
    status: number
    message: string
}

export class DeleteAllPostUsecase implements usecase<DeleteAllPostInputDto, DeleteAllPostOutputDto> {

    private constructor(private readonly gateway: PostGateway) { }

    static create(gateway: PostGateway) {
        return new DeleteAllPostUsecase(gateway)
    }

    execute(input: DeleteAllPostInputDto): Promise<DeleteAllPostOutputDto> {
        const response = this.gateway.deleteAll(input)
        return response
    }

}