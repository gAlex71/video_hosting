import React, { FC, forwardRef } from 'react'
import { IField } from './Field.interface'
import styles from './Field.module.scss'

//forwardRef - для правильной передачи ref
const Field: FC = forwardRef<HTMLInputElement, IField>(
	({ error, type = 'text', style, ...rest }, ref) => {
		return (
			<div className={styles.input} style={style}>
				<input ref={ref} type={type} {...rest} />
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)

Field.displayName = 'Field';

export default Field;
