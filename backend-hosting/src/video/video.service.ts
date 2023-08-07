import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoEntity } from './video.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly VideoRepository: Repository<VideoEntity>,
  ) {}

  async byId(id: number, isPublic = false) {
    const video = await this.VideoRepository.findOne({
      where: isPublic
        ? {
            id,
            isPublic: true,
          }
        : {
            id,
          },
      relations: {
        user: true,
        comments: {
          user: true,
        },
      },
      select: {
        user: {
          id: true,
          name: true,
          avatarPath: true,
          isVerified: true,
          subscribersCount: true,
          subscriptions: true,
        },
        comments: {
          message: true,
          id: true,
          user: {
            id: true,
            name: true,
            avatarPath: true,
            isVerified: true,
            subscribersCount: true,
          },
        },
      },
    });

    if(!video) throw new NotFoundException('Видео не найдено!');
    
    return video;
  }

  
}
