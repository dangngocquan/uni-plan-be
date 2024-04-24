import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailResetPassword(
    email: string,
    otp: string,
  ): Promise<SentMessageInfo> {
    return await this.mailerService.sendMail({
      to: email,
      subject: '[Wallpaper] Reset password',
      template: './reset-password', // `.hbs` extension is appended automatically
      context: {
        name: email,
        otp: otp,
      },
    });
  }

  async sendEmailVerifySignup(
    email: string,
    otp: string,
  ): Promise<SentMessageInfo> {
    return await this.mailerService.sendMail({
      to: email,
      subject: '[Wallpaper] Email Verification',
      template: './verify-email', // `.hbs` extension is appended automatically
      context: {
        name: email,
        otp: otp,
      },
    });
  }
}
