import {FC} from 'react'
import styles from './Sidebar.module.scss';
import Link from 'next/link';
import Menu from './Menu/Menu';
import { menuData } from './Menu/menu.data';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/store/api/api';

const Sidebar: FC = () => {
    const { user } = useAuth()

	const { data } = api.useGetProfileQuery(null, {
		skip: !user
	})

    return (
        <aside className={styles.sidebar}>
            <Link href='/'>
                <div className={styles.logo}>VideoHost</div>
            </Link>

            <Menu title='Меню' items={menuData} />

            {user && (
                <Menu title='Мои подписки' items={
                    data?.subscriptions.map(({toChannel}) => ({
                        image: toChannel.avatarPath,
                        title: toChannel.name,
                        link: '/c/' + toChannel.id
                    })) || []
                } />
            )}

            <div className={styles.copy}>
                @ 2023 VideoHost by gAlex
            </div>
        </aside>
    )
}

export default Sidebar;