import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './burger-ingredient.module.css'
import PropTypes from 'prop-types'

export const BurgerIngredient = ({ count, image, price, name }) => {
    return (
        <article className={`${styles.Card}`}>
            {!!count && <Counter count={count} size="default" />}
            <img src={image} alt={name} className={`ml-4 mr-4 ${styles.Illustration}`} />
            <div className={`mt-1 mb-1 ${styles.Price}`}>
                <p className="text text_type_digits-default">{price}</p>
                <CurrencyIcon type='primary' />
            </div>
            <div className={styles.Name}>{name}</div>
        </article>
    )
}

BurgerIngredient.propTypes = {
    count: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
}