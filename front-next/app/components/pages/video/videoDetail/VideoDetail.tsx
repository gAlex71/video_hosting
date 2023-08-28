import React, {FC} from 'react'
import styles from './VideoDetail.module.scss'
import { IVideo } from '@/types/video.interface'
import { videoApi } from '@/store/api/video.api';
import InfoChannel from '@/components/ui/InfoChannel/InfoChannel';
import { IUser } from '@/types/user.interface';
import SubscribeButton from '@/components/ui/SubscribeButton/SubscribeButton';
import { RiHeart2Fill } from 'react-icons/ri'
import { IoEyeSharp } from 'react-icons/io5'
import { HiCalendar } from 'react-icons/hi2'
import { fromatNumberToK } from '@/utils/format_number';
import dayjs from 'dayjs';

interface DetailVideoProps {
    video: IVideo;
    channel: IUser;
}

const VideoDetail: FC<DetailVideoProps> = ({video, channel}) => {
    const [updateLikes, {isLoading}] = videoApi.useUpdateLikesMutation()

    return (
        <div className={styles.detail}>
            <div>
                <InfoChannel channel={channel} />
                <h1>{video.name}</h1>
                <article className={styles.article}>{video.description}</article>
            </div>

            <div className='pt-2'>
                <div className={styles.wrapper_button}>
                    {video.user?.id && (
                        <SubscribeButton channelIdForSubscribe={video.user.id} />
                    )}

                    <button
                        className={styles.likeButton}
                        disabled={isLoading}
                        onClick={() => updateLikes(video.id)}
                    >
                        <RiHeart2Fill />
                        Нравится
                    </button>
                </div>

                <div className={styles.number_info}>
                    <div>
                        <IoEyeSharp />
                        <span>{fromatNumberToK(video.views)} views</span>
                    </div>
                    <div>
                        <RiHeart2Fill />
                        <span>{fromatNumberToK(video.likes)} likes</span>
                    </div>
                    <div>
                        <HiCalendar />
                        <span>{dayjs(new Date(video.createAt)).fromNow()}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoDetail