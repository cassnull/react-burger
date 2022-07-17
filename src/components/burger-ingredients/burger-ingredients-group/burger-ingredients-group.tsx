import { useCallback, useEffect, createRef } from 'react'
import styles from './burger-ingredients-group.module.css'
import { BurgerIngredient } from './burger-ingredient/burger-ingredient'
import { useSelector } from '../../../services/hooks'

type TProp = {
    id: string
    type: string
    observer: IntersectionObserver
}

export const BurgerIngredientsGroup = ({ id, type, observer }: TProp) => {
    const ingredients = useSelector(state => state.ingredients.ingredients)
    const { bun, toppings } = useSelector(state => state.burgerConstructor)

    const getCount = useCallback((id: string) => {
        if (bun && bun._id === id) return 2
        return toppings.filter(t => t._id === id).length
    }, [bun, toppings])

    const getIngredients = useCallback(() => {
        return ingredients.filter(ingr => ingr.type === id)
    }, [id, ingredients])

    const ref = createRef<HTMLDivElement>()
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
                {getIngredients().map(ingr =>
                    <BurgerIngredient key={ingr._id} count={getCount(ingr._id)} ingredientsData={ingr} />
                )}
            </div>
        </div>
    )
}
