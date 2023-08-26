import React, { FC } from 'react'
import styles from './InfoChannel.module.scss'
import { IUser } from '@/types/user.interface'
import Avatar from '../Avatar/Avatar'
import { fromatNumberToK } from '@/utils/format_number'

interface InfoPropsChannel {
    channel: IUser
    message?: string
}

const InfoChannel: FC<InfoPropsChannel> = ({ channel, message }) => {
  return (
    <div className={styles.profile_info}>
        {channel.avatarPath && <Avatar user={channel} />}

        <div>
            <div className={styles.name}>{channel.name}</div>
            <div className={styles.subscribers_count}>
                {message || fromatNumberToK(channel.subscribersCount) + ' subscribers'} 
            </div>
        </div>
    </div>
  )
}

export default InfoChannel