export interface EmailRequest {
  email: string;
  frontendUrl: string;
  type: string;
}
export interface EmailResponse {
  success: boolean;
  message: string;
}