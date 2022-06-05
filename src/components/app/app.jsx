import { useEffect, useReducer, useState } from 'react'
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients'
import { BurgerConstructor } from '../burger-constructor/burger-constructor'
import * as api from '../../services/api'
import { IngredientsContext } from '../../services/ingredientsContext'
import { OrderContext } from '../../services/orderContext'
import { orderReducer, orderInitialState } from '../../services/orderReducer'
import { ingredientsReducer, ingredientsInitialState } from '../../services/ingredientsReducer'

export const App = () => {
  const [error, setError] = useState('')
  const [ingredients, ingredientsDispatch] = useReducer(ingredientsReducer, ingredientsInitialState)
  const [order, orderDispatch] = useReducer(orderReducer, orderInitialState)

  useEffect(() => {
    const getData = async () => {
      await api.getIngredients()
        .then(data => ingredientsDispatch({ type: "setIngredients", data: data.data }))
        .catch(error => {
          console.error(error)
          setError(error.message)
        })
    }
    getData();
  }, [])

  return (
    <div className={`ml-10 mr-10 ${styles.App}`}>
      <AppHeader />
      <main className={styles.Main}>
        <IngredientsContext.Provider value={[ingredients, ingredientsDispatch]}>
          <OrderContext.Provider value={[order, orderDispatch]}>
            {!error
              ? <>
                <BurgerIngredients />
                <BurgerConstructor />
              </>
              : `Неизвестная ошибка: ${error}`}
          </OrderContext.Provider>
        </IngredientsContext.Provider>
      </main>
    </div>
  )
}
