import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from 'src/mail/mail/mail.module';
import { MailService } from 'src/mail/mail/mail.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService,MailService],
  imports: [PrismaModule,MailModule],
  exports: [UsersService],
})
export class UsersModule {}
