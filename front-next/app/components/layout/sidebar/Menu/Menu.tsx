import React, { FC } from 'react';
import styles from './Menu.module.scss';
import { IMenu } from './Menu.interface';
import MenuItem from './MenuItem';
import Line from '@/components/ui/Line';

const Menu: FC<IMenu> = ({title, items}) => {
  return (
    <nav className={styles.menu_sidebar}>
        <h3>{title}</h3>

        <ul>
            {items.map((menuItem) => (
                <MenuItem key={menuItem.link} item={menuItem} />
            ))}
        </ul>

        <Line />
    </nav>
  )
}

export default Menu;