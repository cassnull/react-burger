import { ChangeEvent, RefObject, SyntheticEvent, useRef, useState } from 'react'
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, Redirect } from 'react-router-dom'
import { authLogout, updateUser } from '../../../services/actions/authAction'
import { useDispatch, useSelector } from '../../../services/hooks'

import styles from './profile.module.css'

export const Profile = () => {
  const dispatch = useDispatch()

  const { user, logoutRequest } = useSelector(state => state.auth)

  const [isDisabledName, setDisabledName] = useState(true)
  const [isDisabledEmail, setDisabledEmail] = useState(true)
  const [isDisabledPassword, setDisabledPassword] = useState(true)

  const [values, setValues] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    const value = target.value
    const name = target.name
    setValues({ ...values, [name]: value })
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(updateUser(values))
    setDisabledName(true)
    setDisabledEmail(true)
    setDisabledPassword(true)
  }

  const inputNameRef = useRef<HTMLInputElement>(null)
  const inputEmailRef = useRef<HTMLInputElement>(null)
  const inputPasswordRef = useRef<HTMLInputElement>(null)

  const onIconClick = (refName: RefObject<HTMLInputElement>) => {
    if (!refName.current) return
    const name = refName.current.name;
    if (name === 'name') {
      setDisabledName(!isDisabledName);
    } else if (name === 'email') {
      setDisabledEmail(!isDisabledEmail);
    } else if (name === 'password') {
      setDisabledPassword(!isDisabledPassword);
    }
    setTimeout(() => refName.current!.focus(), 0);
  }

  const handleLogout = () => {
    const refreshToken = localStorage.getItem('refreshToken')
    dispatch(authLogout({ token: refreshToken }))
  }

  const handleReset = () => {
    if (!user) return
    setValues({ ...values, name: user.name, email: user.email, password: '' });
    setDisabledName(true);
    setDisabledEmail(true);
    setDisabledPassword(true);
  }

  if (!user) {
    return <Redirect to={{ pathname: '/login' }} />
  }

  return (
    <main className={`${styles.Container} pl-5 pr-5`}>
      <section className={styles.Wrapper}>
        <div className={styles.LeftSide}>
          <ul className='mb-20'>
            <li className='text text_type_main-medium'>
              <NavLink
                activeClassName={styles.Active}
                className={`${styles.Link} pt-4 pb-4`}
                to='/profile'
              >
                Профиль
              </NavLink>
            </li>
            <li className='text text_type_main-medium'>
              <NavLink
                activeClassName={styles.Active}
                className={`${styles.Link} pt-4 pb-4`}
                to='/profile/orders'
              >
                История заказов
              </NavLink>
            </li>
            <li className='text text_type_main-medium'>
              <NavLink
                activeClassName={styles.Active}
                className={`${styles.Link} pt-4 pb-4`}
                to={!logoutRequest ? '/profile' : '/login'}
                onClick={handleLogout}
              >
                Выход
              </NavLink>
            </li>
          </ul>
          <p className={`${styles.Text} text text_type_main-default`}>
            В этом разделе вы можете
            <br />
            изменить свои персональные данные
          </p>
        </div>
        <form onSubmit={onSubmit} className={styles.Form}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleChange}
            value={values.name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            icon={isDisabledName ? 'EditIcon' : 'CloseIcon'}
            ref={inputNameRef}
            onIconClick={() => onIconClick(inputNameRef)}
            disabled={isDisabledName}
          />
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleChange}
            value={values.email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            icon={isDisabledEmail ? 'EditIcon' : 'CloseIcon'}
            ref={inputEmailRef}
            onIconClick={() => onIconClick(inputEmailRef)}
            disabled={isDisabledEmail}
          />
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={handleChange}
            value={values.password}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            icon={isDisabledPassword ? 'EditIcon' : 'CloseIcon'}
            ref={inputPasswordRef}
            onIconClick={() => onIconClick(inputPasswordRef)}
            disabled={isDisabledPassword}
          />
          {user.name !== values.name ||
            user.email !== values.email ||
            values.password.length >= 3 ? (
            <div className={styles.Buttons}>
              <Button type='secondary' size='medium' onClick={handleReset}>
                Отмена
              </Button>
              <Button type='primary' size='medium' htmlType='submit'>
                Сохранить
              </Button>
            </div>
          ) : null}
        </form>
      </section>
    </main>
  )
}