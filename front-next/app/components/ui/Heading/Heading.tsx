import React, {FC} from 'react'
import styles from './Heading.module.scss'

const Heading: FC<{title: string}> = ({title}) => {
  return (
    <div className={styles.title}>
        <h2>{title}</h2>
    </div>
  )
}

export default Heading