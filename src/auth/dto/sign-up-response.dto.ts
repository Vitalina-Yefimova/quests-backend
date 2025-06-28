import { SignUpResponse } from '../interfaces';

export class SignUpResponseDto implements SignUpResponse {
  access_token: string;

  constructor(token: string) {
    this.access_token = token;
  }
}