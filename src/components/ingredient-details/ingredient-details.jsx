import styles from './ingredient-details.module.css'
import { useSelector } from 'react-redux'

export const IngredientDetails = () => {
    const ingredient = useSelector(state => state.ingredientDetails.ingredient)
    return (
        <div className={styles.IngredientDetails}>
            <img
                className={styles.IngredientImage}
                src={ingredient.image}
                alt={ingredient.name}
            />
            <h3 className={`text text_type_main-medium mt-4 mb-8 ${styles.IngredientName}`}>
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
    );
}