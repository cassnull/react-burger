import { useCallback, useEffect, createRef } from 'react';
import styles from './burger-ingredients-group.module.css'
import { BurgerIngredient } from './burger-ingredient/burger-ingredient'
import PropTypes from 'prop-types'
import { ingredientsDataPropTypes } from '../../../utils/data'

export const BurgerIngredientsGroup = ({ id, type, ingredients, selected, observer }) => {
    const getCount = useCallback((id) => {
        return selected.filter(si => si._id === id).length
    }, [selected])

    const ref = createRef()
    useEffect(() => {
        const element = ref?.current
        if (element && observer) {
            observer.observe(element)
        }

        return () => {
            if (element && observer) {
                observer.unobserve(element)
            }
        }
    }, [ref, observer])

    return (
        <div ref={ref} id={id}>
            <h3 className={`mb-6 ${styles.Header}`}>
                {type}
            </h3>
            <div className={`ml-4 ${styles.Ingredients}`}>
                {ingredients.map((ingr) =>
                    <BurgerIngredient key={ingr._id} count={getCount(ingr._id)} ingredientsData={ingr} />
                )}
            </div>
        </div>
    )
}

BurgerIngredientsGroup.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(ingredientsDataPropTypes.isRequired).isRequired,
    selected: PropTypes.arrayOf(ingredientsDataPropTypes.isRequired).isRequired,
    observer: PropTypes.object.isRequired,
}