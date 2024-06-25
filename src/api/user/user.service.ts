import { BadRequestException, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/data/entity/api/user/user.entity';
import * as bcrypt from 'bcrypt';
import {
  ICreateUser,
  IUser,
  IUserFindCondition,
} from 'src/data/interface/api/user/user.interface';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async create(userData: ICreateUser) {
    const encryptedPassword: string = await bcrypt.hash(
      userData.userPassword,
      10,
    );

    const { userId }: IUser = await this.userRepository.save({
      ...userData,
      username: userData.username.toLowerCase(),
      userPassword: encryptedPassword,
    });

    const user = await this.userRepository.findOne({
      where: { userId },
    });

    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }
  async findWithCondition(userCondition: IUserFindCondition) {
    const user = await this.userRepository.findOne({
      where: { ...userCondition },
    });

    if (!user) {
      throw new BadRequestException(
        `The user ${userCondition.username} was not found in the database`,
      );
    }

    return user;
  }

  async findOne(userId: string) {
    return await this.userRepository.findOne({ where: { userId: userId } });
  }
}
