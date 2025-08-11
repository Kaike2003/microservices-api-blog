import { UserGateway } from "../../domain/gateway/user.gateway";
import { usecase } from "../usecase";

export type UpdateInputDto = {
    email: string;
    newPassword: string;
    oldPassword: string;
};

export type UpdateOutputDto = {
    message: string;
    status: number;
};

export class UpdatePasswordUsecase implements usecase<UpdateInputDto, UpdateOutputDto> {
    private constructor(private readonly gateway: UserGateway) { }

    public static create(gateway: UserGateway) {
        return new UpdatePasswordUsecase(gateway);
    }

    async execute(input: UpdateInputDto): Promise<UpdateOutputDto> {
        const response = await this.gateway.updatePassword(input)
        return response
    }
}
