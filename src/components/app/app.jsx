import { useEffect } from 'react'
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients'
import { BurgerConstructor } from '../burger-constructor/burger-constructor'
import { useDispatch, useSelector } from 'react-redux'
import { getIngredients } from "../../services/actions/index";

export const App = () => {
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.ingredients)

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return (
    <div className={`ml-10 mr-10 ${styles.App}`}>
      <AppHeader />
      <main className={styles.Main}>
        {!error
          ? <>
            <BurgerIngredients />
            <BurgerConstructor />
          </>
          : `Неизвестная ошибка: ${error}`}
      </main>
    </div>
  )
}
