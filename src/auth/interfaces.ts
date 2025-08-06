export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  frontendUrl: string;
}

export interface SignInResponse {
  access_token: string;
}

export interface OtpVerifyRequest {
  phone: string;
  code: string;
}

export interface OtpSendRequest {
  phone: string;
}

export interface EmailChangeRequest {
  newEmail: string;
  frontendUrl: string;
}