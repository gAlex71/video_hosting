import { videoApi } from "@/store/api/video.api";
import { IVideoDto } from "@/types/video.interface";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IUseUploadVideoForm {
    videoId: number;
    handleCloseModal:() => {}
}

export const useUploadVideoForm = ({videoId, handleCloseModal}: IUseUploadVideoForm) => {
    const {register, formState: {errors}, control, handleSubmit, watch, setValue, reset} = useForm<IVideoDto>({mode: 'onChange'})

    const [updateVideo, {isSuccess}] = videoApi.useUpdateVideoMutation;

    const onSubmit: SubmitHandler<IVideoDto> = data => {
        updateVideo({ ...data, id: videoId }).unwrap.then(() => {
            handleCloseModal()
            reset()
        })
    }

    const videoPat = watch('videoPath')
    const thumbnailPath = watch('thumbnailPath')
    const [videoFileName, setVideoFileName] = useState('')

    const handleUpdateVideo = (value: IMediaResponse) => {
        setValue('videoPath', value.url)
        setValue('name', value.name)
        setVideoFileName(value.name)
    }

    const [isChosen, setIsChosen] = useState(false)
}