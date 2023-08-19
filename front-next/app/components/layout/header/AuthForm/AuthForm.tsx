import React, { useState } from 'react';
import styles from './AuthForm.module.scss';
import stylesForIcon from '../IconsRight/IconsRight.module.scss';
import { useOutside } from '@/hooks/useOutside';
import { useAuth } from '@/hooks/useAuth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IAuthFields } from './AuthForm.interface';
import { FaUserCircle } from 'react-icons/fa';

const AuthForm = () => {
  const { ref, setIsShow, isShow } = useOutside(false);
  const [ type, setType ] = useState<'login' | 'register'>('login');

  // const { isLoading } = useAuth();

  const {register, formState: {errors}, handleSubmit} = useForm<IAuthFields>({mode: 'onChange'});

  const onSubmit: SubmitHandler<IAuthFields> = data => {
    if(type === 'login'){
      //action
    }else{
      //action
    }
  }

  const authForm = () => {
    return (
      <form className={styles.from} onSubmit={handleSubmit(onSubmit)}>

      </form>
    )
  }

  return (
    <div className={styles.wrapper} ref={ref}>
      <button className={stylesForIcon.button} onClick={() => setIsShow(!isShow)}>
        <FaUserCircle fill='#A4A4A4' />
      </button>

      {isShow && authForm()}
    </div>
  )
}

export default AuthForm;