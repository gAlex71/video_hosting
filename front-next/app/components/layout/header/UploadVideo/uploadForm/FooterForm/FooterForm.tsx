import React, {FC} from 'react'
import styles from './FooterForm.module.scss'
import cn from 'classnames'
import {MdUpload, MdCheckCircle} from 'react-icons/md'
import Button from '@/components/ui/Button/Button'

const FooterForm: FC<{percent: number, isUploaded: boolean}> = ({percent, isUploaded}) => {
  return (
    <div className={styles.footer}>
        <div className={cn(styles.status, {
            [styles['icons-uploaded']]: isUploaded
        })}>
            <MdUpload className={styles['upload-icon']} />
            <MdCheckCircle className={styles['check-icon']} />

            <span>
                {isUploaded ? 'Video is uploaded' : `Uploading ${percent}%...`}
            </span>
        </div>
        <div>
            <Button>Save</Button>
        </div>
    </div>
  )
}

export default FooterForm