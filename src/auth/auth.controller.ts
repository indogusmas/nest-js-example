import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RegisterEntity } from './entities/register.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('login')
  @ApiOkResponse({type: AuthEntity })
  async login(@Body(){email,password}: LoginDto){
    return this.authService.login(email,password);
  }

  @Post('register')
  @ApiOkResponse({type: RegisterEntity})
  async register(@Body() register:RegisterDto){
    return this.authService.register(register);
  }
}
