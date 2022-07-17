import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredient.module.css'
import PropTypes from 'prop-types'
import { ingredientsDataPropTypes } from '../../../../utils/types'
import { useDrag } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { openIngredientDetails } from '../../../../services/actions/ingredientDetailsAction'
import { Link, useLocation } from 'react-router-dom'

export const BurgerIngredient = ({ count, ingredientsData }) => {
    const dispatch = useDispatch()
    const location = useLocation()

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: { _id: ingredientsData._id },
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    })

    const handleOpenIngredientInModal = () => {
        dispatch(openIngredientDetails(ingredientsData))
    }

    return (
        <Link
            className={styles.Link}
            key={ingredientsData._id}
            to={{
                pathname: `/ingredients/${ingredientsData._id}`,
                state: { details: location },
            }}
            ref={dragRef}
        >
            <article className={`${styles.Card}`} onClick={() => handleOpenIngredientInModal()}>
                {!!count && <Counter count={count} size="default" />}
                <img src={ingredientsData.image} alt={ingredientsData.name} className={`ml-4 mr-4 ${styles.Illustration}`} />
                <div className={`mt-1 mb-1 ${styles.Price}`}>
                    <p className="text text_type_digits-default">{ingredientsData.price}</p>
                    <CurrencyIcon type='primary' />
                </div>
                <div className={styles.Name}>{ingredientsData.name}</div>
            </article>
        </Link>
    )
}

BurgerIngredient.propTypes = {
    count: PropTypes.number.isRequired,
    ingredientsData: ingredientsDataPropTypes.isRequired,
}