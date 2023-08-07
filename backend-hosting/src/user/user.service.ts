import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { SubscriptionEntity } from './subscription.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UserDto } from './user.dto';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(SubscriptionEntity)
        private readonly subscriptionRepository: Repository<SubscriptionEntity>
    ) {}

    //by-id
    async byId(id: number){
        const user = await this.userRepository.findOne({
            where: {
                id
            },
            relations: {
                videos: true,
                subscriptions: {
                    toChannel: true
                }
            },
            //Сортировка по дате
            order: {
                createdAt: 'DESC'
            }
        });

        if(!user) throw new NotFoundException('Пользователь не найден!')

        return user;
    }

    //update
    async updateProfile(id: number, dto: UserDto){        
        const user = await this.byId(id);

        const isOldUser = await this.userRepository.findOneBy({email: dto.email});
        if(isOldUser && id !== isOldUser.id) throw new BadRequestException('Email уже занят!');

        if(dto.password){
            const salt = await genSalt(10);
            user.password = await hash(dto.password, salt);
        }

        user.email = dto.email;
        user.name = dto.name;
        user.description = dto.description;
        user.avatarPath = dto.avatarPath;

        return this.userRepository.save(user);
    }

    //subscribe
    async subscribe(id: number, channelId: number){
        console.log(id, channelId);
        
        const data = {
            toChannel: {id: channelId},
            fromUser: {id}
        }

        const isSubscribed = await this.subscriptionRepository.findOneBy(data);

        //человек не подписан
        if(!isSubscribed){            
            const newSubscription = this.subscriptionRepository.create(data);
            await this.subscriptionRepository.save(newSubscription);

            return true;
        }

        await this.subscriptionRepository.delete(data);

        return false;
    }

    //возвращаем всех пользователей
    async getAll(){
        return this.userRepository.find();
    }
}