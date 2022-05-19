import React, { createRef, useMemo, useState } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIngredientsGroup } from './burger-ingredients-group/burger-ingredients-group'
import styles from './burger-ingredients.module.css'
import { ingredientType, ingredientsDataPropTypes, orderDataPropTypes } from '../../utils/data'
import PropTypes from 'prop-types'

export const BurgerIngredients = ({ ingredients, order }) => {
    const [currentTab, setCurrentTab] = useState(ingredientType.BUN)

    const filter = (ingredients, ingredientType) => ingredients.filter((item) => item.type === ingredientType)

    const bunsRefElement = createRef()
    const buns = useMemo(() =>
        filter(ingredients, ingredientType.BUN),
        [ingredients]
    )
    const selectedBuns = useMemo(() =>
        order.bun ? [order.bun] : [],
        [order]
    )

    const saucesRefElement = createRef()
    const sauces = useMemo(() =>
        filter(ingredients, ingredientType.SAUCE),
        [ingredients]
    )
    const selectedSauces = useMemo(() =>
        filter(order.toppings, ingredientType.SAUCE),
        [order]
    )

    const mainsRefElement = createRef()
    const mains = useMemo(() =>
        filter(ingredients, ingredientType.MAIN),
        [ingredients]
    )
    const selectedMains = useMemo(() =>
        filter(order.toppings, ingredientType.MAIN),
        [order]
    )

    const getRefElement = React.useCallback((typeName) => {
        switch (typeName) {
            case ingredientType.BUN:
                return bunsRefElement
            case ingredientType.SAUCE:
                return saucesRefElement
            case ingredientType.MAIN:
                return mainsRefElement
            default:
                throw new Error(`Неизвестный тип '${typeName}'`);
        }
    }, [bunsRefElement, saucesRefElement, mainsRefElement])

    const trackScroll = React.useCallback(() => {
        const top = 325;
        const mainsElement = getRefElement(ingredientType.MAIN).current
        if (mainsElement && mainsElement.getBoundingClientRect().top <= top) {
            setCurrentTab(ingredientType.MAIN)
            return
        }
        const saucesElement = getRefElement(ingredientType.SAUCE).current
        if (saucesElement && saucesElement.getBoundingClientRect().top <= top) {
            setCurrentTab(ingredientType.SAUCE)
            return
        }
        setCurrentTab(ingredientType.BUN)
    }, [getRefElement])

    const ingredientsRefElement = createRef()

    React.useEffect(() => {
        const element = ingredientsRefElement.current;
        if (element) {
            element.addEventListener('scroll', trackScroll);
            trackScroll()
        }

        return () => {
            if (element) {
                element.removeEventListener('scroll', trackScroll)
            }
        }
    }, [ingredientsRefElement, trackScroll]);

    const onTabClick = (tab) => {
        setCurrentTab(tab);
        const element = getRefElement(tab).current
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        <section className={`mr-10 pt-10 mb-10 ${styles.BurgerIngredients}`}>
            <h2 className={styles.Title}>
                Соберите бургер
            </h2>
            <div className={`mt-5 mb-10 ${styles.Tabs}`}>
                <Tab value={ingredientType.BUN} active={currentTab === ingredientType.BUN} onClick={onTabClick}>
                    Булки
                </Tab>
                <Tab value={ingredientType.SAUCE} active={currentTab === ingredientType.SAUCE} onClick={onTabClick}>
                    Соусы
                </Tab>
                <Tab value={ingredientType.MAIN} active={currentTab === ingredientType.MAIN} onClick={onTabClick}>
                    Начинка
                </Tab>
            </div>
            <ul className={styles.Ingredients} ref={ingredientsRefElement}>
                <BurgerIngredientsGroup id={ingredientType.BUN} type='Булки' ingredients={buns} ref={bunsRefElement} selected={selectedBuns} />
                <BurgerIngredientsGroup id={ingredientType.SAUCE} type='Соусы' ingredients={sauces} ref={saucesRefElement} selected={selectedSauces}/>
                <BurgerIngredientsGroup id={ingredientType.MAIN} type='Начинка' ingredients={mains} ref={mainsRefElement} selected={selectedMains}/>
            </ul>
        </section>
    )
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsDataPropTypes.isRequired).isRequired,
    order: orderDataPropTypes.isRequired,
}