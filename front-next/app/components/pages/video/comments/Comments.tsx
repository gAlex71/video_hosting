import React, {FC} from 'react'
import styles from './Comments.module.scss'
import { IComment } from '@/types/comment.interface'
import { useAuth } from '@/hooks/useAuth';
import CommentsItem from './CommentsItem';
import AddComment from './AddComment';

interface CommentsProps {
  comments: IComment[];
  videoId: number;
}

const Comments: FC<CommentsProps> = ({comments, videoId}) => {
  const {user} = useAuth()

  return (
    <div className={styles.comments}>
      <h2>Комментарии</h2>
      <div className={styles.line} />

      {comments.length ? (
        <div className={styles.grid}>
          {comments.map(comment => (
            <CommentsItem key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <p>Комментарии отсутствуют!</p>
      )}

      <div className={styles.bottomForm}>
        {user && <AddComment videoId={videoId} />}
      </div>
    </div>
  )
}

export default Comments