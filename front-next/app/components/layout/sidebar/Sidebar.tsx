import Link from 'next/link';
import styles from './Sidebar.module.scss';
import Menu from './Menu/Menu';
import { menuData } from './Menu/menu.data';

const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <Link href='/'>
                <a className={styles.logo}>VideoHost</a>
            </Link>

            <Menu title='Меню' items={menuData} />

            <div className={styles.copy}>
                @ 2023 VideoHost by gAlex
            </div>
        </aside>
    )
}

export default Sidebar;