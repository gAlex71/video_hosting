import {ChangeEvent, SetStateAction, Dispatch} from 'react'
import { MediaService } from "@/services/media/media.service"
import { errorCatch } from "@/utils/api.utils"
import { useMutation } from "react-query"

type useUploadsProps = {
    folder?: string,
    onChange: (...event: any) => void,
    setValue?: (val: number) => void,
    setIsChosen?: Dispatch<SetStateAction<boolean>>
}
//Используем react-query, для загрузки и отслеживания видео с axios
export const useUploadFile = ({folder, onChange, setValue, setIsChosen}: useUploadsProps) => {
    const {mutateAsync} = useMutation('upload file', (data: FormData) => MediaService.upload(data, folder, setValue), {
        onSuccess: ({data}) => {
            onChange(data)
        },
        onError: (error: any) => {
            alert(
                errorCatch(error)
            )
        }
    })

    //Функция, отвечающая за загрузку файла
    const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if(!files?.length) return

        setIsChosen && setIsChosen(true)

        const formData = new FormData()
        formData.append('media', files[0])

        await mutateAsync(formData)
    }

    return {uploadFile}
}