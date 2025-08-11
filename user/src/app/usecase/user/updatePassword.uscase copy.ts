import { UserGateway } from "../../domain/gateway/user.gateway";
import { usecase } from "../usecase";

export type UpdateEmailInputDto = {
    newEmail: string
    oldEmail: string
};

export type UpdateEmailOutputDto = {
    message: string;
    status: number;
};

export class UpdateEmailUsecase implements usecase<UpdateEmailInputDto, UpdateEmailOutputDto> {
    private constructor(private readonly gateway: UserGateway) { }

    public static create(gateway: UserGateway) {
        return new UpdateEmailUsecase(gateway);
    }

    async execute(input: UpdateEmailInputDto): Promise<UpdateEmailOutputDto> {
        const response = await this.gateway.updateEmail(input)
        return response
    }
}
