import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients'
import { BurgerConstructor } from '../burger-constructor/burger-constructor'
import { ingredients, order } from '../../utils/data';

export const App = () => {
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
