import React, {FC} from 'react'
import styles from './Studio.module.scss'
import { api } from '@/store/api/api'
import { videoApi } from '@/store/api/video.api'
import Layout from '@/components/layout/Layout'
import Catalog from '../home/catalog/Catalog'
import Loader from '@/components/ui/Loader'

const Studio: FC = () => {
  const { data, isLoading } = api.useGetProfileQuery(null)
  const [removeVideo] = videoApi.useDeleteVideoMutation()

  const videos = data?.videos

  return (
    <Layout title='Studio profile'>
      <div>
        {isLoading ? (
          <Loader count={5} />
        ) : videos?.length ? (
          <Catalog 
            newVideos={videos}
            removeHandler={removeVideo}
            isUpdateLink
          />
        ) : (
          <p>Видео не найдены</p>
        )}
      </div>
    </Layout>
  )
}

export default Studio