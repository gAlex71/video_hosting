import React, {FC} from 'react';
import styles from './Search.module.scss';
import { useSearch } from '@/hooks/useSearch';
import VideoItem from '@/components/ui/VideoItem/VideoItem';

const Search: FC = () => {
  const { data, handleSearch, searchTerm, isSuccess } = useSearch();

  return (
    <div className={styles.search_top}>
      <label>
        <input 
          type='text'
          placeholder='Поиск видео...'
          value={searchTerm}
          onChange={handleSearch}
        />

        <img src='' alt='' />
      </label>

      {isSuccess && (
        <div className={styles.result}>
          {data?.length ? (
            data.map(video => <VideoItem isSmall item={video} key={video.id} />)
          ) : (
            <div className='text-white'>Видео не найдены</div>
          )}
        </div>
      )}
    </div>
  )
}

export default Search;