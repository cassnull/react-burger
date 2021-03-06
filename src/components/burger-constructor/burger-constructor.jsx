import { useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Button,
    CurrencyIcon,
    ConstructorElement as UIConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Modal } from '../modal/modal'
import { OrderDetails } from '../order-details/order-details'
import { EmptyConstructorElement } from './empty-constructor-element/empty-constructor-element'
import { createOrder } from '../../services/actions/orderAction'
import { useDrop } from 'react-dnd'
import { addBunToConstructor, addToppingToConstructor } from '../../services/actions/constructorAction'
import { EIngredient } from '../../utils/types'
import { ConstructorElement } from './constructor-element/constructor-element'
import { useSelector, useDispatch } from '../../services/hooks'

import styles from './burger-constructor.module.css'

export const BurgerConstructor = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const ingredients = useSelector(state => state.ingredients.ingredients)
    const bun = useSelector(state => state.burgerConstructor.bun)
    const toppings = useSelector(state => state.burgerConstructor.toppings)
    const { error } = useSelector(state => state.order)
    const { user } = useSelector(state => state.auth)

    const handleDrop = (itemId) => {
        const ingredient = ingredients.find(
            ({ _id }) => _id === itemId._id
        );
        const isBun = ingredient.type === EIngredient.BUN;

        if (isBun) {
            dispatch(addBunToConstructor(ingredient))
        } else {
            dispatch(addToppingToConstructor(ingredient))
        }
    }

    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(itemId) {
            handleDrop(itemId);
        },
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
    });

    const [isOpenOrderDetailsModal, setOpenOrderDetailsModal] = useState(false)

    const totalPrice = useMemo(() => {
        let total = bun ? bun.price * 2 : 0
        return toppings.reduce((previousValue, ingr) => previousValue + ingr.price, total)
    }, [bun, toppings])

    const handleOpenOrderDetailsInModal = () => {
        if (!bun && !toppings.length) {
            return
        }
        if (!user) {
            history.push('/login')
        }
        if (bun) {
            setOpenOrderDetailsModal(true);
            dispatch(createOrder([bun, [...toppings]]))
        }
    }

    const handleCloseOrderDetailsInModal = () => {
        setOpenOrderDetailsModal(false)
    }

    return (
        <section className={`pt-25 mb-10 ${styles.BurgerConstructor}`}>
            <ul className={`ml-4 ${isHover ? styles.OnHover : ''} ${styles.ConstructorList}`} ref={dropTarget}>
                {bun ? (<div className={`ml-8 mr-4 mb-4 ${styles.First}`}>
                    <UIConstructorElement
                        type='top'
                        isLocked={true}
                        text={`${bun.name} (????????)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>) : (
                    <EmptyConstructorElement
                        text={`???? ???????????? ???????????????? ?????????????????? ??????????, ?????????????????? ???? ???????????????? ???? ???????????????????????? ????????.`}
                    />
                )}
                <div className={styles.Middle}>
                    {toppings.length > 0 ? toppings.map((ingr, idx) => (<ConstructorElement
                        key={ingr.id}
                        index={idx}
                        ingredient={ingr}
                    />)) : (
                        <EmptyConstructorElement
                            text={`???? ???????????? ???????????????? ?????????????????? ??????????????, ?????????????????? ???? ???????????????? ???? ???????????????????????? ????????.`}
                        />
                    )}
                </div>
                {bun ? (<div className={`ml-8 mt-4 mr-4 ${styles.Last}`}>
                    <UIConstructorElement
                        type='bottom'
                        isLocked={true}
                        text={`${bun.name} (??????)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>) : (
                    <EmptyConstructorElement
                        text={`???? ???????????? ???????????????? ?????????????????? ??????????, ?????????????????? ???? ???????????????? ???? ???????????????????????? ????????.`}
                    />
                )}
            </ul>
            <div className={`mt-10 mr-4 ${styles.Order}`}>
                <div className={`mr-10 ${styles.Total}`}>
                    <p className={`text text_type_digits-medium ${styles.Price}`}>{totalPrice}</p>
                    <CurrencyIcon type='primary' />
                </div>
                <Button onClick={handleOpenOrderDetailsInModal}>???????????????? ??????????</Button>
            </div>
            {!error
                ? (isOpenOrderDetailsModal && (
                    <Modal onClose={handleCloseOrderDetailsInModal}>
                        <OrderDetails />
                    </Modal>
                ))
                : `????????????: ${error}`
            }
        </section>
    )
}