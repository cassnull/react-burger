import styles from './ingredient-details.module.css'
import { useParams } from 'react-router-dom'
import { useSelector } from '../../services/hooks'

type TProp = {
    title?: string
}

export const IngredientDetails = ({ title }: TProp) => {
    const { id } = useParams<{ id: string }>()
    const ingredients = useSelector(state => state.ingredients.ingredients)

    const ingredient = ingredients.find(
        (ingredient) => ingredient._id === id
    )

    return (
        <>
            {ingredient && (
                <div className={styles.IngredientDetails}>
                    {title && (
                        <h2 className={`text text_type_main-large mt-30 ${styles.Title}`}>
                            {title}
                        </h2>
                    )}
                    <img
                        className={styles.IngredientImage}
                        src={ingredient.image}
                        alt={ingredient.name}
                    />
                    <h3 className={`text text_type_main-medium mt-4 mb-8 ${styles.IngredientName} ${title ? styles.TextCenter : ''}`}>
                        {ingredient.name}
                    </h3>
                    <ul className={`mb-15 ${styles.IngredientDetailsList}`}>
                        <li className={styles.IngredientDetailsItem}>
                            <p className='text text_type_main-default text_color_inactive mb-2'>
                                Калории, ккал
                            </p>
                            <p className={`text text_type_main-default text_centre text_color_inactive ${styles.IngredientDetailsItemValue}`}>
                                {ingredient.calories}
                            </p>
                        </li>
                        <li className={styles.IngredientDetailsItem}>
                            <p className='text text_type_main-default text_color_inactive mb-2'>
                                Белки, г
                            </p>
                            <p className={`text text_type_main-default text_color_inactive ${styles.IngredientDetailsItemValue}`}>
                                {ingredient.proteins}
                            </p>
                        </li>
                        <li className={styles.IngredientDetailsItem}>
                            <p className='text text_type_main-default text_color_inactive mb-2'>
                                Жиры, г
                            </p>
                            <p className={`text text_type_main-default text_color_inactive ${styles.IngredientDetailsItemValue}`}>
                                {ingredient.fat}
                            </p>
                        </li>
                        <li className={styles.IngredientDetailsItem}>
                            <p className='text text_type_main-default text_color_inactive mb-2'>
                                Углеводы, г
                            </p>
                            <p className={`text text_type_main-default text_color_inactive ${styles.IngredientDetailsItemValue}`}>
                                {ingredient.carbohydrates}
                            </p>
                        </li>
                    </ul>
                </div>
            )}
        </>
    )
}
