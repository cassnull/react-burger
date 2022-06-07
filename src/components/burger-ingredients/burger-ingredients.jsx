import { createRef, useMemo, useState, useEffect } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIngredientsGroup } from './burger-ingredients-group/burger-ingredients-group'
import styles from './burger-ingredients.module.css'
import { ingredientType } from '../../utils/types'

export const BurgerIngredients = () => {
    const [currentTab, setCurrentTab] = useState(ingredientType.BUN)

    const ingredientsRefElement = createRef()

    const observer = useMemo(() => {
        return new IntersectionObserver(
            (entries) => {
                const selectedTab = entries.some((entry) => {
                    if (entry.isIntersecting) {
                        setCurrentTab(entry.target.id)
                        return true
                    }
                    return false
                })
                if (!selectedTab) {
                    const nextSibling = document.getElementById(currentTab).nextSibling
                    const nextTab = nextSibling?.id
                    if (nextTab) {
                        setCurrentTab(nextTab)
                    }
                }
            },
            { root: ingredientsRefElement.current, threshold: 0.3, rootMargin: '0px', }
        )
    }, [ingredientsRefElement, currentTab])

    useEffect(() => {
        return () => {
            observer.disconnect()
        }
    }, [observer])

    const onTabClick = (tab) => {
        const element = document.getElementById(tab)
        if (element) {
            setCurrentTab(tab);
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
                <BurgerIngredientsGroup id={ingredientType.BUN} type='Булки' observer={observer} />
                <BurgerIngredientsGroup id={ingredientType.SAUCE} type='Соусы' observer={observer} />
                <BurgerIngredientsGroup id={ingredientType.MAIN} type='Начинка' observer={observer} />
            </ul>
        </section>
    )
}