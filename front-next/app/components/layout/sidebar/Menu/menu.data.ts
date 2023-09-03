import { IMenuItem } from "./Menu.interface";
import { HiHome, HiChartBar, HiStar, HiCollection } from 'react-icons/hi';

export const menuData: IMenuItem[] = [
    {
        title: 'Главная',
        icon: HiHome,
        link: '/'
    },
    {
        title: 'Тренды',
        icon: HiChartBar,
        link: '/trends'
    },
    {
        title: 'Мой канал',
        icon: HiStar,
        link: '/my-channel'
    },
    {
        title: 'Подписки',
        icon: HiCollection,
        link: '/subscriptions'
    },
]