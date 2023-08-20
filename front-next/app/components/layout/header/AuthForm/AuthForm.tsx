import React, { useState } from 'react';
import styles from './AuthForm.module.scss';
import stylesForIcon from '../IconsRight/IconsRight.module.scss';
import { useOutside } from '@/hooks/useOutside';
import { useAuth } from '@/hooks/useAuth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IAuthFields } from './AuthForm.interface';
import { FaUserCircle } from 'react-icons/fa';
import Field from '@/components/ui/Field/Field';
import { validEmail } from './Auth.validate';
import Button from '@/components/ui/Button/Button';
import { useActions } from '@/hooks/useActions';

const AuthForm = () => {
  const { ref, setIsShow, isShow } = useOutside(false);
  const [ type, setType ] = useState<'login' | 'register'>('login');

  const { login, register: registerAction } = useActions();

  const { isLoading } = useAuth();

  const {register, formState: {errors}, handleSubmit} = useForm<IAuthFields>({mode: 'onChange'});

  const onSubmit: SubmitHandler<IAuthFields> = data => {
    if(type === 'login'){
      login(data)
    }else{
      registerAction(data)
    }
  }

  const authForm = () => {
    return (
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Field 
          {...register('email', {
            required: 'E-mail обязателен!',
            pattern: {
              value: validEmail,
              message: 'Неверный формат e-mail'
            }
          })}
          placeholder='E-mail'
          error={errors.email}
        />
        <Field 
          {...register('password', {
            required: 'Пароль обязателен!',
            minLength: {
              value: 6,
              message: 'Минимальная длина пароля - 6 символов'
            }
          })}
          placeholder='Пароль'
          error={errors.password}
          type='password'
        />


        <div className='mt-5 mb-1 text-center'>
          <Button onClick={() => setType('login')} disabled={isLoading}>
            Войти
          </Button>
        </div>

        <button className={styles.register} onClick={() => setType('register')} disabled={isLoading}>
          Регистрация
        </button>
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