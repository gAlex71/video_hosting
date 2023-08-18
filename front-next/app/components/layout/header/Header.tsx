import { FC } from "react";
import styles from './Header.module.scss';
import Search from "./Search/Search";
import IconsRight from "./IconsRight/IconsRight";

const Header: FC = () => {
    return (
        <header className={styles.header}>
            <Search />
            <IconsRight />
        </header>
    )
}

export default Header;