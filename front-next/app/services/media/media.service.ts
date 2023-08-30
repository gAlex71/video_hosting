import { axiosBase } from "api/axios"
import { IMediaResponse } from "./media.interface"

export const MediaService = {
    async upload(media: FormData, folder?: string, setValue?: (val:number) => void){
        return axiosBase.post<IMediaResponse>('/media', media, {
            params: {folder},
            headers: {'Content-Type': 'multipart/form-data'},
            //Получение процесса загрузки видео
            onUploadProgress: progressEvent => {
                if(setValue){
                    const progress = (progressEvent.loaded / (progressEvent.total ?? 0)) * 100
                    setValue(Math.ceil(progress))
                }
            }
        })
    }
}