import styles from './ingredient-details.module.css'
import { ingredientsDataPropTypes } from '../../utils/data'

export const IngredientDetails = ({ ingredientsData }) => {
    return (
        <div className={styles.IngredientDetails}>
            <img
                className={styles.IngredientImage}
                src={ingredientsData.image}
                alt={ingredientsData.name}
            />
            <h3 className={`text text_type_main-medium mt-4 mb-8 ${styles.IngredientName}`}>
                {ingredientsData.name}
            </h3>
            <ul className={`mb-15 ${styles.IngredientDetailsList}`}>
                <li className={styles.IngredientDetailsItem}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>
                        Калории, ккал
                    </p>
                    <p className={`text text_type_main-default text_centre text_color_inactive ${styles.IngredientDetailsItemValue}`}>
                        {ingredientsData.calories}
                    </p>
                </li>
                <li className={styles.IngredientDetailsItem}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>
                        Белки, г
                    </p>
                    <p className={`text text_type_main-default text_color_inactive ${styles.IngredientDetailsItemValue}`}>
                        {ingredientsData.proteins}
                    </p>
                </li>
                <li className={styles.IngredientDetailsItem}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>
                        Жиры, г
                    </p>
                    <p className={`text text_type_main-default text_color_inactive ${styles.IngredientDetailsItemValue}`}>
                        {ingredientsData.fat}
                    </p>
                </li>
                <li className={styles.IngredientDetailsItem}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>
                        Углеводы, г
                    </p>
                    <p className={`text text_type_main-default text_color_inactive ${styles.IngredientDetailsItemValue}`}>
                        {ingredientsData.carbohydrates}
                    </p>
                </li>
            </ul>
        </div>
    );
};

IngredientDetails.propTypes = {
    ingredientsData: ingredientsDataPropTypes.isRequired,
}