import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UnauthorizedException } from '@nestjs/common/exceptions';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/data/entity/api/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  constructor(
    private readonly userService: UserService,
    private readonly jwtTokenService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user?.userPassword !== pass) {
      throw new UnauthorizedException();
    }
    const { userPassword, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
}
