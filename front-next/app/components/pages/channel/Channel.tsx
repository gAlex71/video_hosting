import React, {FC} from 'react'
import { IChannel } from './Channel.interface'
import Layout from '@/components/layout/Layout'
import Catalog from '../home/catalog/Catalog'
import InfoChannel from '@/components/ui/InfoChannel/InfoChannel'

const Channel: FC<IChannel> = ({channel}) => {
  return (
    <Layout title={channel.name}>
        <div className='mb-10 w-1/3'>
            <div className='flex items-center gap-12'>
                <InfoChannel channel={channel} />
            </div>
            <article className='text-gray-500 mt-3'>{channel.description}</article>
        </div>

        <Catalog newVideos={channel.videos || []} />
    </Layout>
  )
}

export default Channel