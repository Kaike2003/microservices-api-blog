import { Auth } from "../entity/auth.entity";


export interface UpdateUser {
  email: string,
  newPassword: string,
  oldPassword: string
}

export interface UpdateEmail {
  newEmail: string
  oldEmail: string
}

export interface AuthGateway {
  signup(auth: Auth): Promise<{ message: string; status: number }>;
  signin(email: string, password: string): Promise<{ message?: string; status: number; access_token?: string }>;
  updatePassword(dto: UpdateUser): Promise<{ message: string; status: number }>;
  updateEmail(dto: UpdateEmail): Promise<{ message: string; status: number }>;
}
