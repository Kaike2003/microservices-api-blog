import { User } from "../entity/user.entity";


export interface UpdateUser {
  email: string,
  newPassword: string,
  oldPassword: string
}

export interface UpdateEmail {
  newEmail: string
  oldEmail: string
}

export interface UserGateway {
  signup(user: User): Promise<{ message: string; status: number }>;
  updatePassword(dto: UpdateUser): Promise<{ message: string; status: number }>;
  updateEmail(dto: UpdateEmail): Promise<{ message: string; status: number }>;
}
