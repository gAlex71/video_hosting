import React, {FC} from 'react'
import styles from './Video.module.scss'
import { useRouter } from 'next/router'
import { videoApi } from '@/store/api/video.api'
import { IVideo } from '@/types/video.interface'
import Layout from '@/components/layout/Layout'
import VideoPlayer from './videoPlayer/VideoPlayer'
import cn from 'classnames'

const Video: FC = () => {
  const { query } = useRouter()

  const { data: video = {} as IVideo } = videoApi.useGetVideoByIdQuery(Number(query.id), {
    skip: !query?.id
  })

  return (
    <Layout title={video.name}>
      <div className={styles.layout}>
        <VideoPlayer videoPath={video.videoPath} />
      </div>

      <div className={cn(styles.layout, 'mt-7')}>
        
      </div>
    </Layout>
  )
}

export default Video