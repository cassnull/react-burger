import { ChangeEvent, SyntheticEvent, useState } from 'react'
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { authRegister } from '../../../services/actions/authAction'
import { TLocationState } from '../../../utils/types'
import { useDispatch, useSelector } from '../../../services/hooks'

import styles from '../registration.module.css'

export const Registration = () => {
  const dispatch = useDispatch()
  const location = useLocation<TLocationState>()
  const { user } = useSelector(state => state.auth)
  const history = useHistory()

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  })

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(authRegister(values))
    history.replace({ pathname: '/' })
  }

  if (user) {
    return <Redirect to={location.state?.from || '/'} />;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    const value = target.value
    const name = target.name
    setValues({ ...values, [name]: value })
  }

  return (
    <main className={`${styles.Container} pl-5 pr-5`}>
      <form className={styles.Wrapper} onSubmit={onSubmit}>
        <p className='text text_type_main-medium'>Регистрация</p>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleChange}
          value={values.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
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
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={'password'}
        />
        <Button type='primary' size='medium'>
          Зарегистрироваться
        </Button>
      </form>
      <div className={`${styles.BottomSide} mt-20`}>
        <p className={`${styles.Text} text text_type_main-default`}>
          Уже зарегистрированы?&nbsp;
          <Link
            className={`${styles.Link} text text_type_main-default`}
            to='/login'
          >
            Войти
          </Link>
        </p>
      </div>
    </main>
  )
}
