import { useMemo, useState, useContext } from 'react'
import {
    Button,
    CurrencyIcon,
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import { Modal } from '../modal/modal'
import { OrderDetails } from '../order-details/order-details'
import { OrderContext } from '../../services/orderContext'
import * as api from '../../services/api'

export const BurgerConstructor = () => {
    const [error, setError] = useState("")

    const [order, orderDispatch] = useContext(OrderContext)

    const [isOpenOrderDetailsModal, setOpenOrderDetailsModal] = useState(false)

    const total = useMemo(() => {
        let total = order.bun ? order.bun.price * 2 : 0;
        return order.toppings.reduce((previousValue, ingr) => previousValue + ingr.price, total)
    }, [order])

    const handleOpenOrderDetailsInModal = () => {
        if (order.bun) {
            const getData = async () => {
                await api.createOrder([order.bun._id, ...order.toppings.map(t => t._id)])
                    .then(data => {
                        setError("");
                        orderDispatch({ type: "setNumber", data })
                        setOpenOrderDetailsModal(true)
                    })
                    .catch(error => {
                        console.error(error)
                        setError(error.message)
                    })
            }
            getData()
        }
    }

    const handleCloseOrderDetailsInModal = () => {
        setOpenOrderDetailsModal(false)
    }

    return (
        <section className={`pt-25 mb-10 ${styles.BurgerConstructor}`}>
            <ul className={`ml-4 ${styles.ConstructorList}`}>
                <div className={`ml-8 mr-4 mb-4 ${styles.First}`}>
                    {order.bun && (<ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${order.bun.name} (верх)`}
                        price={order.bun.price}
                        thumbnail={order.bun.image}
                    />)}
                </div>
                <div className={styles.Middle}>
                    {order.toppings.map((ingr, i) => (
                        <div key={`${ingr._id}_${i}`} className={styles.Card}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                className='ml-2'
                                text={ingr.name}
                                price={ingr.price}
                                thumbnail={ingr.image}
                            />
                        </div>)
                    )}
                </div>
                <div className={`ml-8 mt-4 mr-4 ${styles.Last}`}>
                    {order.bun && (<ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${order.bun.name} (низ)`}
                        price={order.bun.price}
                        thumbnail={order.bun.image}
                    />)}
                </div>
            </ul>
            <div className={`mt-10 mr-4 ${styles.Order}`}>
                <div className={`mr-10 ${styles.Total}`}>
                    <p className={`text text_type_digits-medium ${styles.Price}`}>{total}</p>
                    <CurrencyIcon type='primary' />
                </div>
                <Button onClick={handleOpenOrderDetailsInModal}>Оформите заказ</Button>
            </div>
            {!error
                ? (isOpenOrderDetailsModal && (
                    <Modal onClose={handleCloseOrderDetailsInModal}>
                        <OrderDetails />
                    </Modal>
                ))
                : `Ошибка: ${error}`
            }
        </section>
    )
}