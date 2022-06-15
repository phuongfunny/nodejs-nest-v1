import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../authencation/guards/jwt.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { DataThrowUser } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getUsers(@Param('id') id: string): Promise<DataThrowUser | null> {
    return this.userService._getUserById(id);
  }
}
