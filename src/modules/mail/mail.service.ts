import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailResetPassword(
    email: string,
    link: string,
  ): Promise<SentMessageInfo> {
    return await this.mailerService.sendMail({
      to: email,
      subject: '[UniPlan] Reset password',
      template: './reset-password', // `.hbs` extension is appended automatically
      context: {
        name: email,
        link: link,
      },
    });
  }

  async sendEmailVerifyEmail(
    email: string,
    link: string,
  ): Promise<SentMessageInfo> {
    return await this.mailerService.sendMail({
      to: email,
      subject: '[UniPlan] Email Verification',
      template: './verify-email', // `.hbs` extension is appended automatically
      context: {
        name: email,
        link: link,
      },
    });
  }

  async sendEmailDefaultPassword(
    email: string,
    password: string,
  ): Promise<SentMessageInfo> {
    return await this.mailerService.sendMail({
      to: email,
      subject: '[UniPlan] Default password',
      template: './default-password', // `.hbs` extension is appended automatically
      context: {
        name: email,
        password: password,
      },
    });
  }
}
