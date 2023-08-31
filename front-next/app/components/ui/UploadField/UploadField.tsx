import React, {FC} from 'react'
import styles from './UploadField.module.scss'
import { IUploadField } from './UploadField.interface'
import { useUploadFile } from '@/hooks/useUploadFile'

const UploadField: FC<IUploadField> = ({
  title,
  folder,
  onChange,
  setValue,
  setIsChosen
}) => {
  const {uploadFile} = useUploadFile(onChange, folder, setValue, setIsChosen)

  return (
    <div className={styles.file}>
      {title && <h1>{title}</h1>}

      <label>
        <span className='sr-only'>Выберите файл</span>
        <input type='file' onChange={uploadFile} />
      </label>
    </div>
  )
}

export default UploadField