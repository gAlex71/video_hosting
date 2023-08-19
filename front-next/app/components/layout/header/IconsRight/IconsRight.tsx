import React, { FC } from 'react';
import styles from './IconsRight.module.scss';
import { useAuth } from '@/hooks/useAuth';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import UploadVideo from '../UploadVideo/UploadVideo';
import AuthForm from '../AuthForm/AuthForm';

const IconsRight: FC = () => {
  const {user} = useAuth();

  return (
    <div className={styles.icons}>
      {user ? (
        <>
          <ProfileMenu />
          <UploadVideo />
        </>
      ) : (
        <AuthForm />
      )}
    </div>
  )
}

export default IconsRight;