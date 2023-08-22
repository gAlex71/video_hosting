import React from 'react';
import styles from './ProfileMenu.module.scss';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/store/api/api';
import { useOutside } from '@/hooks/useOutside';
import { useActions } from '@/hooks/useActions';
import Image from 'next/image';
import { GoChevronUp, GoChevronDown } from 'react-icons/go';
import Link from 'next/link';

const ProfileMenu = () => {
  const { user } = useAuth();

  //С помощью кастомного хука получаем данные профиля
  const {data, isLoading} = api.useGetProfileQuery(null, {
    skip: !user
  })

  const { isShow, setIsShow, ref } = useOutside(false);

  const { logout } = useActions();

  if (isLoading) return null;

  return (
    <div ref={ref} className={styles.wrapper}>
      <button onClick={() => setIsShow(!isShow)}>
        <Image 
          src={data?.avatarPath || ''}
          alt={data?.name || ''}
          width={40}
          height={40}
          priority
        />
        <span className={styles.name}>{data?.name}</span>
        {isShow ? <GoChevronUp /> : <GoChevronDown />}
      </button>

      {isShow && (
        <div className={styles['profile-menu']}>
          <ul>
            <li>
              <Link href={`/c/${user?.id}`}>
                <a>Мой канал</a>
              </Link>
            </li>
            <li>
              <Link href={`/studio`}>
                <a>Студия</a>
              </Link>
            </li>
            <li>
              <button onClick={logout} >Выйти</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default ProfileMenu;