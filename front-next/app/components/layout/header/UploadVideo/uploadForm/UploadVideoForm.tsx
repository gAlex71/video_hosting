import React, { FC } from 'react'
import { useUploadVideoForm } from '../../../../../hooks/useUploadVideoForm';
import SuccessMessage from './SuccessMessage';
import Field from '@/components/ui/Field/Field';
import styles from '../UploadVideo.module.scss';
import { Controller } from 'react-hook-form';
import TextArea from '@/components/ui/TextArea/TextArea';
import TogglePublic from './TogglePublic/TogglePublic';
import { IMediaResponse } from '@/services/media/media.interface';

interface UploadProps {
    videoId: number;
    handleCloseModal: () => void;
}

const UploadVideoForm: FC<UploadProps> = ({videoId, handleCloseModal}) => {
    const {form, status, media} = useUploadVideoForm({ videoId, handleCloseModal })
  return (
    <form 
        className='flex flex-wrap'
        onSubmit={form.handleSubmit(form.onSubmit)}
    >
        {status.isSuccess && <SuccessMessage />}
        {status.isChosen ? (
            <>
                <div className='w-7/12 pr-6 pt-3'>
                    <Field 
                        {...form.register('name', {
                            required: 'Название обязательно!'
                        })}
                        placeholder='Название'
                        error={form.error.name}
                    />
                    <TextArea 
                        {...form.register('description', {
                            required: 'Описание обязательно!'
                        })}
                        placeholder='Описание'
                        error={form.error.description}
                    />
                    {/* Поле для загрузки картинки */}
                    <div className='mt-8'>
                        <Controller 
                            control={form.control}
                            name='thumbnailPath'
                            render={({ field: { onChange }}) => {
                                <UploadField 
                                    folder='thumbnailPath'
                                    onChange={(value: IMediaResponse) => {
                                        onChange(value.url)
                                    }}
                                />
                            }}
                        />
                    </div>
                    <Controller 
                        control={form.control}
                        name='isPublic'
                        render={({field: {onChange, value}}) => (
                            <TogglePublic
                                clickHandler={() => {
                                    onChange(!value)
                                }}
                                isEnabled={!!value}
                            />
                        )}
                    />
                </div>
                
                <div className={'w-5/12 p-3 pl-10'}>
                    <VideoInformation 
                        fileName={media.videoFileName}
                        videoId={videoId}
                        isUploaded={status.isUploaded}
                        thumbnailPath={media.thumbnailPath}
                    />
                </div>

                <FooterForm isUploaded={status.isUploaded} percent={status.percent} />
            </>
        ) : (
            <div className={styles.uploadScreen}>
                <Controller 
                    control={form.control}
                    name='videoPath'
                    render={() => (
                        <UploadField 
                            title={'Загрузи видео'}  
                            folder='videos'
                            onChange={media.handleUploadVideo}
                            setValue={status.setProgressPersentage}
                            setIsChoosen={status.setIsChosen}
                        />
                    )}
                />
            </div>
        )}
    </form>
  )
}
4.47
export default UploadVideoForm