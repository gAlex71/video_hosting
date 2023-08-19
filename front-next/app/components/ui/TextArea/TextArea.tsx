import React, { forwardRef } from 'react';
import styles from './Field.module.scss';
import { ITextArea } from './TextArea.interface';

//forwardRef - для правильной передачи ref
const TextArea = forwardRef<HTMLTextAreaElement, ITextArea>(
	({ error, style, ...rest }, ref) => {
		return (
			<div className={styles.editor} style={style}>
				<textarea ref={ref} {...rest} />
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)

TextArea.displayName = 'TextArea';

export default TextArea;