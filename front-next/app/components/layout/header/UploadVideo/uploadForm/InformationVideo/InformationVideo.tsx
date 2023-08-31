import React, { FC } from 'react'
import styles from './InformationVideo.module.scss'
import Image from 'next/image'
import Link from 'next/link'

interface IVideoInformation {
    thumbnailPath?: string
    videoId: number
    fileName: string
    isUploaded: boolean
}

const InformationVideo: FC<IVideoInformation> = ({
    thumbnailPath,
    videoId,
    fileName,
    isUploaded
}) => {
  return (
    <div className={styles.info}>
        {!thumbnailPath ? (
            <div className={styles.thumbnail}>
                {!isUploaded
                    ? 'Идет загрзка видео...'
                    : 'Загрузите превью!'
                }
            </div>
        ) : (
            <Image 
                src={thumbnailPath}
                width={344}
                height={190}
                alt=''
                layout='responsive'
            />
        )}

        <div className={styles.details}>
            <div>
                <span>Video link</span>
                <span>
                    <Link href={`/v/${videoId}`}>
                        http://local/v/$videoId
                    </Link>
                </span>
            </div>
            <div>
                <span>File name</span>
                <span>{fileName}</span>
            </div>
        </div>
    </div>
  )
}

export default InformationVideo