import { Controller, Body, Get, Put, HttpCode, Param, UsePipes, ValidationPipe, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from './decorators/user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: number){
    return this.userService.byId(id);
  }

  @Get('by-id/:id')
  async getUser(@Param('id') id: string){
    return this.userService.byId(+id);
  }

  //Изменение пользователя
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async updateUser(@Param('id') id: string, @Body() dto: UserDto){    
    return this.userService.updateProfile(+id, dto);
  }

  //Подписка
  @HttpCode(200)
  @Patch('subscribe/:channelId')
  @Auth()
  async subscribeToChannel(@CurrentUser('id') id: number, @Param('channelId') channelId: string){
    return this.userService.subscribe(id, +channelId);
  }

  @Get()
  async getUsers(){
    return this.userService.getAll();
  }
}
