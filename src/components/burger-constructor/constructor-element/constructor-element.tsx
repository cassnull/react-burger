import { useRef, useCallback } from 'react'
import styles from './constructor-element.module.css'
import {
  ConstructorElement as UIConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag, useDrop } from 'react-dnd'
import { deleteToppingFromConstructor, changeToppingsPosition } from '../../../services/actions/constructorAction'
import { TIngredientsData } from '../../../utils/types'
import { useDispatch } from '../../../services/hooks'

type TProp = {
  ingredient: TIngredientsData
  index: number,
}

export const ConstructorElement = ({ ingredient, index }: TProp) => {
  const dispatch = useDispatch()
  const ref = useRef<HTMLDivElement>(null)

  const handleClose = () => {
    dispatch(deleteToppingFromConstructor(ingredient.id))
  }

  const [, drop] = useDrop<{ id: string; index: number }>({
    accept: "item",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      if (!clientOffset) return

      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveCard(dragIndex, hoverIndex)

      item.index = hoverIndex
    },
  })

  const moveCard = useCallback(
    (fromIndex: number, toIndex: number) => {
      dispatch(changeToppingsPosition(toIndex, fromIndex))
    }, [dispatch])

  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: () => {
      return { id: ingredient._id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref))

  return (
    <div ref={ref} className={styles.Card} style={{ opacity }}>
      <DragIcon type="primary" />
      <UIConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={handleClose}
      />
    </div>
  )
}

