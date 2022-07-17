import { createRef, useMemo, useState, useEffect } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIngredientsGroup } from './burger-ingredients-group/burger-ingredients-group'
import styles from './burger-ingredients.module.css'
import { EIngredient } from '../../utils/types'

declare module 'react' {
    interface FunctionComponent<P = {}> {
      (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null
    }
  }

export const BurgerIngredients = () => {
    const [currentTab, setCurrentTab] = useState<EIngredient>(EIngredient.BUN)

    const ingredientsRefElement = createRef<HTMLUListElement>()

    const observer = useMemo<IntersectionObserver>(() => {
        return new IntersectionObserver(
            (entries) => {
                const selectedTab = entries.some((entry) => {
                    if (entry.isIntersecting) {
                        setCurrentTab(entry.target.id as EIngredient)
                        return true
                    }
                    return false
                })
                if (!selectedTab) {
                    const nextSibling = (document.getElementById(currentTab) as HTMLDivElement).nextSibling as HTMLDivElement
                    const nextTab = nextSibling?.id
                    if (nextTab) {
                        setCurrentTab(nextTab as EIngredient)
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

    const onTabClick = (tab: string) => {
        const element = document.getElementById(tab)
        if (element) {
            setCurrentTab(tab as EIngredient);
            element.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        <section className={`mr-10 pt-10 mb-10 ${styles.BurgerIngredients}`}>
            <h2 className={styles.Title}>
                Соберите бургер
            </h2>
            <div className={`mt-5 mb-10 ${styles.Tabs}`}>
                <Tab value={EIngredient.BUN} active={currentTab === EIngredient.BUN} onClick={onTabClick}>
                    Булки
                </Tab>
                <Tab value={EIngredient.SAUCE} active={currentTab === EIngredient.SAUCE} onClick={onTabClick}>
                    Соусы
                </Tab>
                <Tab value={EIngredient.MAIN} active={currentTab === EIngredient.MAIN} onClick={onTabClick}>
                    Начинка
                </Tab>
            </div>
            <ul className={styles.Ingredients} ref={ingredientsRefElement}>
                <BurgerIngredientsGroup id={EIngredient.BUN} type='Булки' observer={observer} />
                <BurgerIngredientsGroup id={EIngredient.SAUCE} type='Соусы' observer={observer} />
                <BurgerIngredientsGroup id={EIngredient.MAIN} type='Начинка' observer={observer} />
            </ul>
        </section>
    )
}