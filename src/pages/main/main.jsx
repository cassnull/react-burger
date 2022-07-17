import { useSelector } from 'react-redux'
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients'
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor'

import styles from "./main.module.css";

export const Main = () => {
  const { error } = useSelector(state => state.ingredients)

  return (
    <main className={styles.Main}>
      {!error
        ? <>
          <BurgerIngredients />
          <BurgerConstructor />
        </>
        : `Неизвестная ошибка: ${error}`}
    </main>
  )
}