import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/module/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/module/user/dto/update-user.dto';
import { AuthencationService } from './authencation.service';

@Controller('authencation')
export class AuthencationController {
  constructor(private readonly authencationService: AuthencationService) { }

  @Post('register')
  register(@Body() userRegister: Readonly<CreateUserDto>) {
    return this.authencationService.register(userRegister);
  }

  @Post('login')
  login(@Body() userLogin: Readonly<UpdateUserDto>) {
    return this.authencationService.loginUser(userLogin);
  }
}