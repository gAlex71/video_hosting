import { IconType } from 'react-icons';

export interface IMenuItem {
    link: string
    title: string
    icon?: IconType
    image?: string
}

export interface IMenu {
    title: string
    items: IMenuItem[]
}