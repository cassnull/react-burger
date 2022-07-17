import { useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header'
import { Main } from '../../pages/main/main'
import { SignIn } from '../../pages/registration/sign-in/sign-in'
import { Registration } from '../../pages/registration/registration/registration'
import { ForgotPassword1 } from '../../pages/registration/forgot-password-1/forgot-password-1'
import { ForgotPassword2 } from '../../pages/registration/forgot-password-2/forgot-password-2'
import { Profile } from '../../pages/account/profile/profile'
import { getIngredients } from '../../services/actions/ingredientsAction'
import { ProtectedRoute } from '../protected-route/protected-route'
import { IngredientDetails } from '../ingredient-details/ingredient-details'
import { Modal } from '../modal/modal'
import { TLocationDetails } from '../../utils/types';
import { useDispatch } from '../../services/hooks';

export const App = () => {
  const dispatch = useDispatch()
  const location = useLocation<TLocationDetails>()

  let details = location.state && location.state.details

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <div className={`ml-10 mr-10 ${styles.App}`}>
      <AppHeader />
      <Switch location={details || location}>
        <Route path='/' exact={true}>
          <Main />
        </Route>
        <Route path='/login' exact={true}>
          <SignIn />
        </Route>
        <Route path='/register' exact={true}>
          <Registration />
        </Route>
        <Route path='/forgot-password' exact={true}>
          <ForgotPassword1 />
        </Route>
        <Route path='/reset-password' exact={true}>
          <ForgotPassword2 />
        </Route>
        <ProtectedRoute path='/profile' exact={true} component={Profile} />
        <Route path='/ingredients/:id' exact={true}>
          <IngredientDetails title='Детали ингредиента' />
        </Route>
      </Switch>
      {details && (
        <Route
          path='/ingredients/:id'
          children={
            <Modal title='Детали ингредиента'>
              <IngredientDetails />
            </Modal>
          }
        />
      )}
    </div>
  )
}
