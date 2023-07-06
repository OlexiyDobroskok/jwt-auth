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
