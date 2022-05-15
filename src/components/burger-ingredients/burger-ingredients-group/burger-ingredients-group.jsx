import React, { useCallback } from 'react';
import styles from './burger-ingredients-group.module.css'
import { BurgerIngredient } from './burger-ingredient/burger-ingredient'
import PropTypes from 'prop-types'
import { ingredientsDataPropTypes } from '../../../utils/data'

export const BurgerIngredientsGroup = React.forwardRef(({ id, type, ingredients, selected }, ref) => {
    const getCount = useCallback((id) => {
        return selected.filter(si => si._id === id).length
    }, [selected])
    
    return (
        <div ref={ref}>
            <h3 id={id} className={`mb-6 ${styles.Header}`}>
                {type}
            </h3>
            <div className={`ml-4 ${styles.Ingredients}`}>
                {ingredients.map((ingr) =>
                    <BurgerIngredient key={ingr._id} count={getCount(ingr._id)} image={ingr.image} price={ingr.price} name={ingr.name} />
                )}
            </div>
        </div>
    )
})

BurgerIngredientsGroup.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(ingredientsDataPropTypes.isRequired).isRequired,
    selected: PropTypes.arrayOf(ingredientsDataPropTypes.isRequired).isRequired,
}