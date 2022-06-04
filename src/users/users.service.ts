import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User[]> {
    return this.usersRepository.findBy({ id: +id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async login(user: { username: string; password: string }): Promise<User> {
    const found = await this.usersRepository.findOneBy({
      username: user.username,
      password: user.password,
    });
    return found;
  }
}
