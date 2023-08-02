import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './auth.dto';
import { compare, genSalt, hash } from 'bcryptjs';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  // Логирование
  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    return {
      user: this.returnUserFields(user),
      accessToken: await this.isUseAccessToken(user.id),
    };
  }

  //Регистрация
  async register(dto: AuthDto) {
    const oldUser = await this.userRepository.findOneBy({ email: dto.email });
    if (oldUser) throw new BadRequestException('Email уже занят');

    const salt = await genSalt(10);

    const newUser = this.userRepository.create({
      email: dto.email,
      password: await hash(dto.password, salt),
    });

    const user = await this.userRepository.save(newUser);

    return {
      user: this.returnUserFields(user),
      accessToken: await this.isUseAccessToken(user.id),
    };
  }

  //Валидация пользователя
  async validateUser(dto: AuthDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
      select: ['id', 'email', 'password'],
    });

    if (!user) throw new NotFoundException('Пользователь не найден');

    const isValidatePassword = await compare(dto.password, user.password);
    if (!isValidatePassword)
      throw new UnauthorizedException('Не правильный пароль!');

    return user;
  }

  //Создание token
  async isUseAccessToken(userId: number) {
    const data = {
      id: userId,
    };

    return await this.jwtService.signAsync(data, {
      expiresIn: '31d',
    });
  }

  //Возращает пользователя
  returnUserFields(user: UserEntity) {
    return {
      id: user.id,
      email: user.email,
    };
  }
}
