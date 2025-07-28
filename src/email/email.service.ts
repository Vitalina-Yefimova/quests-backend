import { BadRequestException, Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { EmailRequest, EmailResponse } from './interfaces';

@Injectable()
export class EmailService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendEmail(data: EmailRequest): Promise<EmailResponse> {

    const { email, frontendUrl, type } = data;

    const user = await this.usersService.getUser({ email });

    if (!user) {
      throw new BadRequestException('User not found')
    }

    const token = this.jwtService.sign({
      sub: user.id,
      type,
    })

    const url = `${frontendUrl}?token=${token}`;

    const templates = {
      verify: {
        subject: 'Please verify your email',
        html: `<p>Click the link to verify your account: <a href="${url}">Verify Email</a></p>`,
      },
      reset: {
        subject: 'Reset your password',
        html: `<p>Click to reset your password: <a href="${url}">Reset Password</a><p>`,
      }
    };

    const template = templates[type]

    if (!template) {
      throw new BadRequestException('Unsupported email type')
    }

    await sgMail.send({
      to: email,
      from: 'escape_room@meta.ua',
      subject: template.subject,
      html: template.html,
    });

    return {
      success: true
    }
  }
}