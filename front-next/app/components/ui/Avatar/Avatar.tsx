import React, { FC } from 'react'
import styles from './Avatar.module.scss'
import { IUser } from '@/types/user.interface'
import Link from 'next/link';
import cn from 'classnames'
import Image from 'next/image';
import { IoIosCheckmarkCircle } from 'react-icons/io'

interface AvatarProps {
  user: IUser;
  isWhite?: boolean;
}

const Avatar: FC<AvatarProps> = ({user, isWhite}) => {
  return (
    <Link href={`/c/${user.id}`}>
      <span className={cn(styles.avatar, { [styles.white]: isWhite })}>
        <Image 
          width={45}
          height={45}
          alt={user.name}
          src={user.avatarPath}
        />

        {user.isVerified && (
          <span className={styles.isVerified}>
            <IoIosCheckmarkCircle />
          </span>
        )}
      </span>
    </Link>
  )
}

export default Avatar