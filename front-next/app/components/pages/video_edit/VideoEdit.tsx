import React, { FC, useEffect } from 'react'
import styles from './VideoEdit.module.scss'
import { useRouter } from 'next/router'
import { videoApi } from '@/store/api/video.api'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { IVideoDto } from '@/types/video.interface'
import { toastr } from 'react-redux-toastr'
import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'
import Field from '@/components/ui/Field/Field'
import TextArea from '@/components/ui/TextArea/TextArea'
import UploadField from '@/components/ui/UploadField/UploadField'
import { IMediaResponse } from '@/services/media/media.interface'
import TogglePublic from '@/components/layout/header/UploadVideo/uploadForm/TogglePublic/TogglePublic'
import InformationVideo from '@/components/layout/header/UploadVideo/uploadForm/InformationVideo/InformationVideo'
import Button from '@/components/ui/Button/Button'

const VideoEdit: FC = () => {
	const { query } = useRouter()
	const videoId = Number(query.id)

	const { data, isLoading } = videoApi.useGetVideoByIdQuery(videoId, {
		skip: !videoId
	})

	const {
		register,
		formState: { errors },
		control,
		handleSubmit,
		watch,
		setValue
	} = useForm<IVideoDto>({ mode: 'onChange' })

    useEffect(() => {
        if(!watch('name') && data){
            setValue('name', data.name)
            setValue('description', data.description)
            setValue('videoPath', data.videoPath)
            setValue('thumbnailPath', data.thumbnailPath)
            setValue('isPublic', data.isPublic)
        }
    }, [data])

	const [updateVideo, { isLoading: isUpdateLoading }] =
		videoApi.useUpdateVideoMutation()

	const { push } = useRouter()

	const onSubmit: SubmitHandler<IVideoDto> = data => {
		updateVideo({ ...data, id: videoId })
			.unwrap()
			.then(() => {
				toastr.success('Статус', 'Видео обновлено!')
				push('/studio')
			})
	}

	return (
		<Layout title='Редактирование видео'>
			<div>
				{isLoading ? (
					<Loader count={5} />
				) : (
					<form onSubmit={handleSubmit(onSubmit)} className='flex flex-wrap'>
						<div className='w-7/12 pr-6 pt-8'>
							<Field
								{...register('name', {
									required: 'Имя изменено!'
								})}
								placeholder='Name'
								error={errors.name}
							/>

							<TextArea
								{...register('description', {
									required: 'Успешное редактирование изменено!'
								})}
								placeholder='Описание'
								error={errors.description}
							/>

							<div className='mt-8'>
								<Controller
									control={control}
									name='thumbnailPath'
									render={({ field: { onChange } }) => (
										<UploadField
											folder='thumbnails'
											onChange={(value: IMediaResponse) => {
												onChange(value.url)
											}}
										/>
									)}
								/>
							</div>

							<div className='mt-8'>
								<span className='text-white mb-2 block'>Видео: </span>
								<Controller
									control={control}
									name='videoPath'
									render={({ field: { onChange } }) => (
										<UploadField
											folder='thumbnails'
											onChange={(value: IMediaResponse) => {
												onChange(value.url)
											}}
										/>
									)}
								/>
							</div>

							<Controller
								control={control}
								name='isPublic'
								render={({ field: { onChange, value } }) => (
									<TogglePublic
										clickHandler={() => {
											onChange(!value)
										}}
										isEnabled={!!value}
									/>
								)}
							/>
						</div>

						<div className='w-5/12 p-3 pl-10'>
							<InformationVideo
								fileName=''
								videoId={videoId}
								isUploaded
								thumbnailPath={watch('thumbnailPath')}
							/>
						</div>

						<div className='mt-10'>
							<Button>{isUpdateLoading ? 'Загрузка...' : 'Сохранить'}</Button>
						</div>
					</form>
				)}
			</div>
		</Layout>
	)
}

export default VideoEdit
