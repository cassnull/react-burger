import styles from './order-details.module.css'
import Done from './img/done.svg'
import { useSelector } from '../../services/hooks'

export const OrderDetails = () => {
    const order = useSelector(state => state.order)
    return (
        <div className={styles.OrderDetails}>
            <h3
                className={`text text_type_digits-large mt-30 ${styles.OrderNumber}`}
            >
                {order.number}
            </h3>
            <p className={`text text_type_main-medium mt-8 mb-15 ${styles.OrderIdentifier}`}>
                идентификатор заказа
            </p>
            <img src={Done} alt='Готовится' />
            <p className={`text text_type_main-default mt-15 mb-2 ${styles.OrderStatusDescription}`}>
                Ваш заказ начали готовить
            </p>
            <p className={`text secondary text_type_main-default mb-30 ${styles.Description}`}>
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
}