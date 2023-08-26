import React, {FC} from 'react'
import styles from './VideoItem.module.scss'
import cn from 'classnames'
import { IVideo } from '@/types/video.interface'
import Image from 'next/image'
import VideoDuration from './VideoDuration'
import Link from 'next/link'
import Avatar from '../Avatar/Avatar'
import VideoStatistics from './VideoStatistics'

const LargeVideoItem: FC<{ video: IVideo }> = ({video}) => {
  return (
    <div className={cn(styles.video_item, styles.large_item)}>
        <div className={styles.thumbnail}>
            {video.thumbnailPath && (
                <Image 
                    src={video.thumbnailPath}
                    alt={video.name}
                    layout='fill'
                    className={styles['bg-image']}
                    priority
                />
            )}
            <VideoDuration isBottom duration={video.duration} />

            <div className={styles.information}>
                <Link href={`/v/${video.id}`}>
                    <div className={styles.name}>{video.name}</div>
                </Link>

                {video?.user?.avatarPath && <Avatar user={video.user} isWhite />}

                <div className={styles.author}>{video.user?.name}</div>

                <VideoStatistics views={video.views} createdAt={video.createAt} />
            </div>
        </div>
    </div>
  )
}

export default LargeVideoItem