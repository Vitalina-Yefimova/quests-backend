export class RegisterResponseDto {
  access_token: string;

  constructor(token: string) {
    this.access_token = token;
  }
}