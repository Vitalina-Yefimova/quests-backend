import { SignInResponse } from '../interfaces';

export class SignInResponseDto implements SignInResponse {
  access_token: string;

  constructor(token: string) {
    this.access_token = token;
  }
}