import { ChangeEvent, SyntheticEvent, useState } from 'react'
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { passwordReset } from '../../../services/actions/authAction'
import { TLocationState } from '../../../utils/types'
import { useDispatch, useSelector } from '../../../services/hooks'

import styles from '../registration.module.css'

export const ForgotPassword1 = () => {
  const dispatch = useDispatch()
  const location = useLocation<TLocationState>()
  const { user, passwordResetSuccess } = useSelector(state => state.auth)
  const [values, setValues] = useState({
    email: '',
  })

  if (user) {
    return <Redirect to={location.state?.from || "/"} />;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    const value = target.value
    const name = target.name
    setValues({ ...values, [name]: value })
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(passwordReset(values))
  }

  if (passwordResetSuccess) {
    return <Redirect to={{ pathname: '/reset-password' }} />
  }

  return (
    <main className={`${styles.Container} pl-5 pr-5`}>
      <form className={styles.Wrapper} onSubmit={onSubmit}>
        <p className='text text_type_main-medium'>Восстановление пароля</p>
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={handleChange}
          value={values.email}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button type='primary' size='medium' htmlType='submit'>
          Восстановить
        </Button>
      </form>
      <div className={`${styles.BottomSide} mt-20`}>
        <p className={`${styles.Text} text text_type_main-default`}>
          Вспомнили пароль?&nbsp;
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
