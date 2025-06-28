import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendVerifyEmail(to: string, token: string) {
    const message = {
      to,
      from: 'escape_room@meta.ua',
      subject: 'Please verify your email',
      html: `<p>Click the link to verify your account: <a href="http://localhost:5173/verify?token=${token}">Verify Email</a></p>`,
    };

    await sgMail.send(message);
  }
}