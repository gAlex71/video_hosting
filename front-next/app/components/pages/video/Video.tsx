import React, {FC, useEffect} from 'react'
import styles from './Video.module.scss'
import { useRouter } from 'next/router'
import { videoApi } from '@/store/api/video.api'
import { IVideo } from '@/types/video.interface'
import Layout from '@/components/layout/Layout'
import VideoPlayer from './videoPlayer/VideoPlayer'
import cn from 'classnames'
import Comments from './comments/Comments'
import VideoDetail from './videoDetail/VideoDetail'
import { IUser } from '@/types/user.interface'

const Video: FC = () => {
  const { query } = useRouter()

  const { data: video = {} as IVideo } = videoApi.useGetVideoByIdQuery(Number(query.id), {
    skip: !query?.id
  })

  const [updateViews] = videoApi.useUpdateViewsMutation()

  //Обновляем просмотры после прогрузки
  useEffect(() => {
    if(query.id) updateViews(Number(query.id))
  }, [query.id])

  return (
    <Layout title={video.name}>
      <div className={styles.layout}>
        <VideoPlayer videoPath={video.videoPath} />
        <Comments videoId={video.id} comments={video.comments || []} />
      </div>
      
      <div className={cn(styles.layout, 'mt-7')}>
        <VideoDetail video={video} channel={video.user || ({} as IUser)} />
        <div></div>
      </div>
    </Layout>
  )
}

export default Video