import React, { useState } from 'react'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredient.module.css'
import PropTypes from 'prop-types'
import { Modal } from '../../../modal/modal'
import { IngredientDetails } from '../../../ingredient-details/ingredient-details'
import { ingredientsDataPropTypes } from '../../../../utils/types'

export const BurgerIngredient = ({ count, ingredientsData }) => {
    const [isOpenIngredientDetailsModal, setOpenIngredientDetailsModal] = useState(false)

    const handleOpenIngredientInModal = () => {
        setOpenIngredientDetailsModal(true)
    }

    const handleCloseIngredientInModal = () => {
        setOpenIngredientDetailsModal(false)
    }

    const ingredientTitle = 'Детали ингредиента'

    return (
        <>
            <article className={`${styles.Card}`} onClick={() => handleOpenIngredientInModal()}>
                {!!count && <Counter count={count} size="default" />}
                <img src={ingredientsData.image} alt={ingredientsData.name} className={`ml-4 mr-4 ${styles.Illustration}`} />
                <div className={`mt-1 mb-1 ${styles.Price}`}>
                    <p className="text text_type_digits-default">{ingredientsData.price}</p>
                    <CurrencyIcon type='primary' />
                </div>
                <div className={styles.Name}>{ingredientsData.name}</div>
            </article>
            {isOpenIngredientDetailsModal && (
                <Modal onClose={handleCloseIngredientInModal} title={ingredientTitle}>
                    <IngredientDetails ingredientsData={ingredientsData} />
                </Modal>
            )}
        </>
    )
}

BurgerIngredient.propTypes = {
    count: PropTypes.number.isRequired,
    ingredientsData: ingredientsDataPropTypes.isRequired,
}