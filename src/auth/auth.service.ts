import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ){}

  async login(email: string,password: string): Promise<AuthEntity>{
    const user = await this.prisma.user.findUnique({where:{email:email}});

    //if no user is found throw an arror
    if (!user) {
      throw new NotFoundException('No user found');
    }

    //check if the password is correct
    const isPasswordValid = user.password === password;
    //if not valid throw another error
    if(!isPasswordValid){
      throw new NotFoundException('Username or password invalid');
    }

    return {
      accessToken: this.jwtService.sign({
        userId: user.id
      })
    }  
  }
}
