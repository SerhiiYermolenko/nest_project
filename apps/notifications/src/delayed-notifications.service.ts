import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { UserDTO } from '@app/common';

@Injectable()
export class DelayedNotificationService {
  constructor(
    @InjectQueue('notification-queue')
    private readonly notificationQueue: Queue,
  ) {}

  async scheduleWelcomeEmail(event: Omit<UserDTO, 'password'>) {
    await this.notificationQueue.add(
      'welcome-email',
      {
        userId: event._id,
        email: event.email,
      },
      {
        delay: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        attempts: 3, // Retry mechanism
        backoff: {
          type: 'exponential',
          delay: 1000, // Initial backoff delay
        },
      },
    );
  }
}
