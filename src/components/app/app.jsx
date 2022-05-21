import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients'
import { BurgerConstructor } from '../burger-constructor/burger-constructor'
import { order } from '../../utils/data';
import * as api from '../../utils/api';

export const App = () => {
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    const getData = async () => {
      await api.getIngredients()
        .then(data => setIngredients(data.data))
        .catch(e => console.log(e))
    }
    getData();
  }, [])

  return (
    <div className={`ml-10 mr-10 ${styles.App}`}>
      <AppHeader />
      <main className={styles.Main}>
        <BurgerIngredients ingredients={ingredients} order={order} />
        <BurgerConstructor order={order} />
      </main>
    </div>
  )
}
