export interface UserDto {
  id: Id;
  email: Email;
  userName: string;
  isActivated: boolean;
  date: string;
}

export interface SessionDto {
  accessToken: Token;
  userDto: UserDto;
}

export interface RegisterUserRequest {
  userName: string;
  email: Email;
  password: Password;
}

export interface LoginRequest {
  email: Email;
  password: Password;
}

export interface ResetPasswordRequest {
  email: Email;
}

export interface CreatePasswordRequest {
  newPassword: Password;
  resetCode: string;
}

export interface EditPasswordRequest {
  password: Password;
  newPassword: Password;
}

export interface ResponseError {
  message: Message;
  errors?: ApiErrors;
}

export interface ResponseMessage {
  message: Message;
}
