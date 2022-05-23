import { useMemo, useState } from 'react'
import {
    Button,
    CurrencyIcon,
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import { orderDataPropTypes } from '../../utils/data'
import { Modal } from '../modal/modal'
import { OrderDetails } from '../order-details/order-details'

export const BurgerConstructor = ({ order }) => {
    const [orderNumber,] = useState('034536')
    const [isOpenOrderDetailsModal, setOpenOrderDetailsModal] = useState(false)

    const total = useMemo(() => {
        let total = order.bun ? order.bun.price : 0;
        return order.toppings.reduce((previousValue, ingr) => previousValue + ingr.price, total)
    }, [order])

    const handleOpenOrderDetailsInModal = () => {
        setOpenOrderDetailsModal(true)
    }

    const handleCloseOrderDetailsInModal = () => {
        setOpenOrderDetailsModal(false)
    }

    return (
        <section className={`pt-25 mb-10 ${styles.BurgerConstructor}`}>
            <ul className={`ml-4 ${styles.ConstructorList}`}>
                <div className={`ml-8 mr-4 mb-4 ${styles.First}`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${order.bun.name} (верх)`}
                        price={order.bun.price}
                        thumbnail={order.bun.image}
                    />
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
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${order.bun.name} (низ)`}
                        price={order.bun.price}
                        thumbnail={order.bun.image}
                    />
                </div>
            </ul>
            <div className={`mt-10 mr-4 ${styles.Order}`}>
                <div className={`mr-10 ${styles.Total}`}>
                    <p className={`text text_type_digits-medium ${styles.Price}`}>{total}</p>
                    <CurrencyIcon type='primary' />
                </div>
                <Button onClick={handleOpenOrderDetailsInModal}>Оформите заказ</Button>
            </div>
            {isOpenOrderDetailsModal && (
                <Modal onClose={handleCloseOrderDetailsInModal}>
                    <OrderDetails orderNumber={orderNumber} />
                </Modal>
            )}
        </section>
    )
}

BurgerConstructor.propTypes = {
    order: orderDataPropTypes.isRequired,
}