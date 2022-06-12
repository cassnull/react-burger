import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredient.module.css'
import PropTypes from 'prop-types'
import { Modal } from '../../../modal/modal'
import { IngredientDetails } from '../../../ingredient-details/ingredient-details'
import { ingredientsDataPropTypes } from '../../../../utils/types'
import { useDrag } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { openIngredientDetails, closeIngredientDetails } from '../../../../services/actions'

export const BurgerIngredient = ({ count, ingredientsData }) => {
    const dispatch = useDispatch()
    const { isOpen } = useSelector(state => state.ingredientDetails)

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

    const handleCloseIngredientInModal = () => {
        dispatch(closeIngredientDetails(ingredientsData))
    }

    const ingredientTitle = 'Детали ингредиента'

    return (
        <>
            <article className={`${styles.Card}`} onClick={() => handleOpenIngredientInModal()} ref={dragRef}>
                {!!count && <Counter count={count} size="default" />}
                <img src={ingredientsData.image} alt={ingredientsData.name} className={`ml-4 mr-4 ${styles.Illustration}`} />
                <div className={`mt-1 mb-1 ${styles.Price}`}>
                    <p className="text text_type_digits-default">{ingredientsData.price}</p>
                    <CurrencyIcon type='primary' />
                </div>
                <div className={styles.Name}>{ingredientsData.name}</div>
            </article>
            {isOpen && (
                <Modal onClose={handleCloseIngredientInModal} title={ingredientTitle}>
                    <IngredientDetails />
                </Modal>
            )}
        </>
    )
}

BurgerIngredient.propTypes = {
    count: PropTypes.number.isRequired,
    ingredientsData: ingredientsDataPropTypes.isRequired,
}