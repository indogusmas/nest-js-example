import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService : MailerService){}

  async sendEmail(email: string){
    try {
      const bodyEmail = 'Welcome to app';
      await this.mailerService.sendMail({
          to: email,
          from: 'igusmas619@gmail.com',
          subject: 'Welcome to app',
          text: bodyEmail,
          html: `<p>${bodyEmail}</p>`
      });
    } catch (error) {
      console.log(`Error send mail ${error}`);
    }
  }
}
