import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './app-header.module.css'

export const AppHeader = () => {
    return (
        <header className={`pl-10 pr-10 mt-10 ${styles.AppHeader}`}>
            <nav className={styles.Menu}>
                <ul className={styles.MenuItems}>
                    <li className={`pt-4 pr-5 pb-4 ${styles.MenuItem}`}><a href="/#" className={`pt-4 pr-5 pb-4 ${styles.Link}`}><BurgerIcon type="primary" /><p className={`pl-3 ${styles.Name}`}>Конструктор</p></a></li>
                    <li className={`pl-5 pt-4 pr-5 pb-4 ${styles.MenuItem}`}><a href="/#" className={`pt-4 pr-5 pb-4 ${styles.Link}`}><ListIcon type="secondary" /><p className={`pl-3 ${styles.Name}`}>Лента заказов</p></a></li>
                </ul>
                <a href="/#" className={styles.Logo}>
                    <Logo />
                </a>
                <a href="/#" className={styles.Profile}><ProfileIcon type="secondary" /><p>Личный кабинет</p></a>
            </nav>
        </header>
    )
}