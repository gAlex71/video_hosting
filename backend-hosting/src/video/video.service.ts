import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoEntity } from './video.entity';
import { FindOptionsWhereProperty, ILike, MoreThan, Repository } from 'typeorm';
import { VideoDto } from './video.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>,
  ) {}

  async byId(id: number, isPublic = false) {
    const video = await this.videoRepository.findOne({
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

  async update(id: number, dto: VideoDto){
    const video = await this.byId(id);

    return this.videoRepository.save({
        //Разворачиваем старые данные и перезаписываем новыми
        ...video, ...dto
    })
  }

  async getAll(searchTerm?:string){
    let options: FindOptionsWhereProperty<VideoEntity> = {}

    if(searchTerm){
        //Поиск видео по имени
        options = {
            name: ILike(`%${searchTerm}%`)
        }
    }

    return this.videoRepository.find({
        where: {
            ...options,
            isPublic: true
        },
        order: {
            createdAt: 'DESC'
        },
        relations: {
            user: true,
            comments: {
                user: true
            }
        },
        select: {
            user: {
                id: true,
                name: true,
                avatarPath: true,
                isVerified: true
            }
        }
    })
  }

  async getMostPopularByViews(){
    return this.videoRepository.find({
        where: {
            views: MoreThan(0)
        },
        relations:{
            user: true
        },
        select: {
            user: {
                id: true,
                name: true,
                avatarPath: true,
                isVerified: true
            }
        },
        order: {
            //Сортировка по просмотрам
            views: -1
        }
    })
  }

  async create(userId: number){
    const defaultValue = {
        name: '',
        user: {id: userId},
        videoPath: '',
        description: '',
        thumbnailPath: ''
    }

    const newVideo = this.videoRepository.create(defaultValue);
    const video = await this.videoRepository.save(newVideo);

    return video.id
  }

  async delete(id: number){
    return this.videoRepository.delete({id});
  }

  async updateCountViews(id: number){
    const video = await this.byId(id)
    video.views++
    return this.videoRepository.save(video)
  }

  async updateLikes(id: number){
    const video = await this.byId(id)
    video.likes++
    return this.videoRepository.save(video)
  }

  async updateDislikes(id: number){
    const video = await this.byId(id)
    video.dislikes++
    return this.videoRepository.save(video)
  }
}
