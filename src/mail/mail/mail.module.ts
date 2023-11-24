import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import MailMessage from 'nodemailer/lib/mailer/mail-message';
import { MailService } from './mail.service';


@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT) || 587,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
        }
      }
    })
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
