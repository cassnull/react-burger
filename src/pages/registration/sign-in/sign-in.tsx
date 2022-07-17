import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom'
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { authLogin } from '../../../services/actions/authAction'
import { TAuth, TLocationState } from '../../../utils/types'
import { useDispatch, useSelector } from '../../../services/hooks'

import styles from '../registration.module.css'

export const SignIn = () => {
  const dispatch = useDispatch()
  const location = useLocation<TLocationState>()
  const { user } = useSelector(state => state.auth)

  const [values, setValues] = useState<TAuth>({
    email: '',
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
    dispatch(authLogin(values))
  };

  if (user) {
    return <Redirect to={location.state?.from || '/'} />
  }

  return (
    <main className={`${styles.Container} pl-5 pr-5`}>
      <form className={styles.Wrapper} onSubmit={onSubmit}>
        <p className='text text_type_main-medium'>Вход</p>
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
          name='password'
        />
        <Button type='primary' size='medium' htmlType='submit'>
          Войти
        </Button>
      </form>
      <div className={`${styles.BottomSide} mt-20`}>
        <p className={`${styles.Text} text text_type_main-default`}>
          Вы — новый пользователь?&nbsp;
          <Link
            className={`${styles.Link} 'text text_type_main-default`}
            to='/register'
          >
            Зарегистрироваться
          </Link>
        </p>
        <p className={`${styles.Text} mt-4 text text_type_main-default`}>
          Забыли пароль?&nbsp;
          <Link
            className={`${styles.Link} text text_type_main-default`}
            to='/forgot-password'
          >
            Восстановить пароль
          </Link>
        </p>
      </div>
    </main>
  )
}