import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EmailService } from '../email.service';

@Processor('notification-queue')
export class NotificationProcessor {
  constructor(private emailService: EmailService) {}

  @Process('welcome-email')
  async handleWelcomeEmail(job: Job) {
    const { userId, email } = job.data;

    try {
      await this.emailService.sendWelcomeEmail(email, userId);
      return {};
    } catch (error) {
      throw error;
    }
  }
}
