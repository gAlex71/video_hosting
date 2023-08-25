import React, {useState} from 'react';
import styles from './UploadVideo.module.scss';
import { videoApi } from '@/store/api/video.api';
import { HiUpload } from 'react-icons/hi';
import stylesIcon from '../IconsRight/IconsRight.module.scss';

const UploadVideo = () => {
  const [ isOpen, setOpen ] = useState(false);
  const [ videoId, setVideoId ] = useState<number>(0);

  const [ createVideo, {isLoading} ] = videoApi.useCreateVideoMutation();

  return (
    <>
      <button 
        className={stylesIcon.button}
        disabled={isLoading}
        onClick={() => {
          createVideo()
            .unwrap()
            .then(id => {
              setVideoId(+id)
              setOpen(true)
            })
        }}
      >
        <HiUpload />
      </button>
    </>
  )
}

export default UploadVideo;