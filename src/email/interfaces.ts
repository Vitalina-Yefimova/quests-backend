export interface EmailRequest {
  email: string;
  body?: string;
  metadata: {
    frontendUrl?: string;
    subject: string;
    template: string;
    [key: string]: any;
  }
}
export interface EmailResponse {
  success: boolean;
}