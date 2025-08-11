import { Auth } from "../../domain/entity/auth.entity";
import { AuthGateway } from "../../domain/gateway/auth.gateway";
import { usecase } from "../usecase";

export type SignupInputDto = {
  email: string;
  password: string;
};

export type SignupOutputDto = {
  status: number;
  message: string | unknown;
};

export class SignupUseCase implements usecase<SignupInputDto, SignupOutputDto> {
  private constructor(private readonly gateway: AuthGateway) {}

  public static create(gateway: AuthGateway) {
    return new SignupUseCase(gateway);
  }

  async execute(input: SignupInputDto): Promise<SignupOutputDto> {
    const auth = Auth.create({ email: input.email, hash: input.password });
    const data = await this.gateway.signup(auth);
    return data;
  }
}
