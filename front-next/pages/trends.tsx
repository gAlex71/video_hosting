import Trends from '@/components/pages/trends/Trends'
import { VideoService } from '@/services/video.service'
import { IVideo } from '@/types/video.interface'
import { GetStaticProps, NextPage } from 'next'
import React from 'react'

const TrendsPage: NextPage<{topVideos: IVideo[]}> = ({topVideos}) => {
  return (
    <Trends topVideos={topVideos} />
  )
}

export const getStaticProps: GetStaticProps = async () => {
    try {
        const { data: topVideos } = await VideoService.getMostPopular()

        return {
            props: {
                topVideos
            },
            revalidate: 60
        }
    } catch (e) {
        return {
            props: {
                topVideos: []
            }
        }
    }
}

export default TrendsPage