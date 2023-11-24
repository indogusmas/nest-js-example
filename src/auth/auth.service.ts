import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';
import { RegisterDto } from './dto/register.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { CompareHash, HashingData } from 'src/utils/helper';
import { RegisterEntity } from './entities/register.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { MailService } from 'src/mail/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
  ){}

  async login(email: string,password: string): Promise<AuthEntity>{
    const user = await this.prisma.user.findUnique({where:{email:email}});

    //if no user is found throw an arror
    if (!user) {
      throw new NotFoundException('No user found');
    }

    //check if the password is correct
    const isPasswordValid = await CompareHash(user.password, password);
    //if not valid throw another error
    if(!isPasswordValid){
      throw new NotFoundException('Username or password invalid');
    }

    await this.mailService.sendEmail('indosamudra7@gmail.com');

    return {
      accessToken: this.jwtService.sign({
        userId: user.id
      })
    }  
  }

  async register(register: RegisterDto): Promise<RegisterEntity> {
    const userExist = await this.prisma.user.findUnique({where: {email: register.email}});

    if(userExist != null){
      throw new ConflictException('User Already Exist!!');
    }
    //hashing Password
    register.password = await HashingData(register.password);
    const createdUser = await this.prisma.user.create({ data: register });
    const userId = createdUser.id;
    
    return {
     data: new UserEntity(createdUser),
     access_token: this.jwtService.sign({
      userId: userId
     })
    } 
  }
}
