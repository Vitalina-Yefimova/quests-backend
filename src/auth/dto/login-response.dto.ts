export class LoginResponseDto {
  access_token: string;

  constructor(token: string) {
    this.access_token = token;
  }
}