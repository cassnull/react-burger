import { NavLink, useRouteMatch } from 'react-router-dom'
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

export const AppHeader = () => {
    const isConstructor = !!useRouteMatch({ path: "/", exact: true })
    const isProfile = !!useRouteMatch({ path: '/profile', exact: true })

    return (
        <header className={`pl-10 pr-10 mt-10 ${styles.AppHeader}`}>
            <nav className={styles.Menu}>
                <ul className={styles.MenuItems}>
                    <li className={`pt-4 pr-5 pb-4 ${styles.MenuItem}`}>
                        <NavLink activeClassName={styles.Active} to='/' className={`pt-4 pr-5 pb-4 ${styles.Profile}`}>
                            <BurgerIcon type={isConstructor ? 'primary' : 'secondary'} />
                            <p className={`pl-3 ${styles.Name} ${isConstructor ? styles.Active : styles.Inactive}`}>Конструктор</p>
                        </NavLink>
                    </li>
                    <li className={`pl-5 pt-4 pr-5 pb-4 ${styles.MenuItem}`}>
                        <NavLink activeClassName={styles.Active} to='/' className={`pt-4 pr-5 pb-4 ${styles.Profile}`}>
                            <ListIcon type='secondary' />
                            <p className={`pl-3 ${styles.Name} ${styles.Inactive}`}>Лента заказов</p>
                        </NavLink>
                    </li>
                </ul>
                <a href='/' className={styles.Logo}>
                    <Logo />
                </a>
                <NavLink
                    activeClassName={styles.Active}
                    className={styles.Profile}
                    to='/profile'
                >
                    <ProfileIcon type={isProfile ? 'primary' : 'secondary'} /><p className={`pl-3 ${isProfile ? styles.Active : styles.Inactive}`}>Личный кабинет</p>
                </NavLink>
            </nav>
        </header>
    )
}