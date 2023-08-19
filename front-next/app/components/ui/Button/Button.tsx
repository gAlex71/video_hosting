import React, { FC, PropsWithChildren } from 'react';
import styles from './Button.module.scss';
import { IButton } from './Button.interface';
import cn from 'classnames';

const Button: FC<PropsWithChildren<IButton>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button className={cn(styles.button, className)} {...rest}>
      {children}
    </button>
  )
}

export default Button;