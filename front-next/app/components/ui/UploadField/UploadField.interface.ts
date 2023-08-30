import {Dispatch, SetStateAction} from 'react'

export interface IUploadField {
    title?: string
    folder?: string
    onChange: (...event: any) => void
    setValue?: (val: number) => void
    setIsChosen?: Dispatch<SetStateAction<boolean>>
}