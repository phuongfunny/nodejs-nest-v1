import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from 'src/module/user/schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<UsersDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UsersDocument> {
    const newUser = new this.usersModel(createUserDto);    
    return newUser.save();
  }

  _getUserDetail(user: UsersDocument): User {
    return {
      id: user._id,
      username: user.username,
      password: user.password,
      first_name: user.first_name,
      last_name: user.last_name,
    };
  }

  async _getUserByUsername(username: string): Promise<UsersDocument | null> {
    return this.usersModel.findOne({ username }).exec();
  }

  async _getUserById(id: string): Promise<User | null> {
    const user = await this.usersModel.findById({ id }).exec();
    if (!user) return null;
    return this._getUserDetail(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
