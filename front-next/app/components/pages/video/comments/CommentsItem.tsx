import { IComment } from '@/types/comment.interface'
import React, { FC } from 'react'
import styles from './Comments.module.scss'
import InfoChannel from '@/components/ui/InfoChannel/InfoChannel'

const CommentsItem: FC<{comment: IComment}> = ({comment}) => {
  return (
    <div className={styles.commentItem}>
        <InfoChannel channel={comment.user} message={comment.message} />
    </div>
  )
}

export default CommentsItem