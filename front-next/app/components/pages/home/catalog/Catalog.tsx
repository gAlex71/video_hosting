import { IVideo } from "@/types/video.interface";
import { FC } from "react";
import styles from './Catalog.module.scss';
import Heading from "@/components/ui/Heading/Heading";
import VideoItem from "@/components/ui/VideoItem/VideoItem";

interface CatalogProps {
    newVideos: IVideo[]
    removeHandler?: (videoId: number) => void
    isUpdateLink?: boolean
}

const Catalog: FC<CatalogProps> = ({newVideos, removeHandler, isUpdateLink}) => {
    return (
        <div className={styles.recommended}>
            <div className={styles.top_block}>
                <Heading title={removeHandler ? 'Мои видео' : 'Рекомендации'} />
            </div>

            <div className={styles.catalog}>
                {newVideos.map(video => (
                    <VideoItem 
                        item={video}
                        key={video.id}
                        removeHandler={removeHandler}
                        isUpdateLink={isUpdateLink}
                    />
                ))}
            </div>
        </div>
    )
}

export default Catalog;