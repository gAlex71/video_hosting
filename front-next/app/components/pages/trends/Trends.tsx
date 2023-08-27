import Layout from '@/components/layout/Layout'
import { IVideo } from '@/types/video.interface'
import React, {FC} from 'react'
import Catalog from '../home/catalog/Catalog'

const Trends: FC<{topVideos: IVideo[]}> = ({topVideos}) => {
  return (
    <Layout title='Тренды'>
        <Catalog newVideos={topVideos} />
    </Layout>
  )
}

export default Trends