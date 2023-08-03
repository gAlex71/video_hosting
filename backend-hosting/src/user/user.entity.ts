import { Base } from "../utils/base";
import { VideoEntity } from "src/video/video.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { SubscriptionEntity } from "./subscription.entity";
import { CommentEntity } from "src/comment/comment.entity";

@Entity('User') //название таблицы
export class UserEntity extends Base {
    @Column({unique: true})
    email: string;

    @Column({select: false}) //Не нужно доставать из бд
    password: string;

    @Column({default: ''})
    name: string;

    @Column({default: false, name: 'is_verified'})
    isVerified: boolean;

    @Column({default: 0, name: 'subscribers_count'})
    subscribersCount?: number;

    @Column({default: '', type: 'text'})
    description: string;

    @Column({default: '', name: 'avatar_path'})
    avatarPath: string;

    @OneToMany(() => VideoEntity, video => video.user)
    videos: VideoEntity[]

    @OneToMany(() => SubscriptionEntity, sub => sub.fromUser)
    subscriptions: SubscriptionEntity[];

    @OneToMany(() => SubscriptionEntity, sub => sub.toChannel)
    subscribers: SubscriptionEntity[];

    // @OneToMany(() => CommentEntity, comment => comment.user)
    // comments: CommentEntity[]
}