import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      // Configure your email provider (e.g., SendGrid, AWS SES)
      host: 'your-smtp-host',
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendWelcomeEmail(email: string, userId: string) {
    await this.transporter.sendMail({
      from: 'your-system@example.com',
      to: email,
      subject: 'Welcome to Our Platform',
      text: `We're glad you joined! Here's a special welcome message for user ${userId}.`,
    });
  }
}
