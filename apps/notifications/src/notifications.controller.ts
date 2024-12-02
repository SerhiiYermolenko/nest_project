import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { DelayedNotificationService } from './delayed-notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserDTO } from '@app/common';

@Controller()
export class NotificationsController {
  constructor(
    private readonly delayedNotificationService: DelayedNotificationService,
  ) {}

  @UsePipes(new ValidationPipe())
  @EventPattern('welcome-email')
  async notifyUserAboutRegistration(@Payload() data: UserDTO) {
    await this.delayedNotificationService.scheduleWelcomeEmail(data);
  }
}
