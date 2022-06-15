import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DataCreated, TokenSuccess } from 'src/constant/ThrowData';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/user.interface';
import { UserService } from 'src/user/user.service';
import { UpdateAuthencationDto } from './dto/update-authencation.dto';

@Injectable()
export class AuthencationService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(
    createAuthencationDto: Readonly<CreateUserDto>,
  ): Promise<User | any> {
    const { first_name, last_name, password, username } = createAuthencationDto;

    switch (true) {
      case !username:
        throw new HttpException('username is not null', HttpStatus.BAD_REQUEST);

      case !password:
        throw new HttpException('password is not null', HttpStatus.BAD_REQUEST);

      default:
        const existingUser = await this.usersService._getUserByUsername(
          username,
        );

        if (existingUser)
          throw new HttpException('username is existing!', HttpStatus.CONFLICT);

        const passwordHashed = await this.hashPassword(password);

        const newUser = await this.usersService.create({
          username,
          password: passwordHashed,
          first_name,
          last_name,
        });

        return DataCreated(newUser);
    }
  }

  async checkPassword(
    password: string,
    passwordHashed: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, passwordHashed);
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const userData = await this.usersService._getUserByUsername(username);

    if (!userData) return null;
      

    const passwordMatched = await this.checkPassword(
      password,
      userData.password,
    );

    if (!passwordMatched)
      throw new HttpException('Password incorrect!', HttpStatus.BAD_REQUEST);

    return this.usersService._getUserDetail(userData);
  }

  async loginUser(existingUser: UpdateUserDto): Promise<{ token: string } | null> {
    const { username, password } = existingUser;
    const user = await this.validateUser(username, password)
    
    if(!user) throw new HttpException('Username does not exist', HttpStatus.BAD_REQUEST);
    
    const jwt = await this.jwtService.signAsync({ username })
    
    return TokenSuccess(jwt)
  }
}
