import { AuthGateway } from "../../domain/gateway/auth.gateway";
import { usecase } from "../usecase";

export type SigninInputDto = {
  email: string;
  password: string;
};
export type SigninOutputDto = {
  status: number;
  message?: string;
  access_token?: string;
};

export class SigninUseCase implements usecase<SigninInputDto, SigninOutputDto> {
  private constructor(private readonly usecase: AuthGateway) {}

  static create(usecase: AuthGateway) {
    return new SigninUseCase(usecase);
  }

  async execute(input: SigninInputDto): Promise<SigninOutputDto> {
    const response = await this.usecase.signin(input.email, input.password);
    return response;
  }
}
