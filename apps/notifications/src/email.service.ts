import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

// Didn't setup email provider since this is a demo app, implemented the flow up to the point of sending the email

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
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
