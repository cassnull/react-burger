import { TIngredientsData } from '../../utils/types'
import { CONTRUCTOR, IAddBunToConstructor, IAddToppingToConstructor, IChangeToppingsPosition, IDeleteToppingFromConstructor, IResetConstructor } from '../actions/constructorAction'

type TBurgerConstructorState = {
  bun?: TIngredientsData
  toppings: TIngredientsData[]
}

const initialState: TBurgerConstructorState = {
  bun: undefined,
  toppings: [],
}

export type TConstructorAction = IAddBunToConstructor
  | IAddToppingToConstructor
  | IDeleteToppingFromConstructor
  | IChangeToppingsPosition
  | IResetConstructor

export const burgerConstructorReducer = (state = initialState, action: TConstructorAction) => {
  switch (action.type) {
    case CONTRUCTOR.ADD_BUN: {
      return {
        ...state,
        bun: (action as IAddBunToConstructor).ingredient,
      }
    }
    case CONTRUCTOR.ADD_TOPPING: {
      return {
        ...state,
        toppings: [...state.toppings, (action as IAddToppingToConstructor).ingredient],
      }
    }
    case CONTRUCTOR.DELETE_TOPPING: {
      return {
        ...state,
        toppings: [...state.toppings].filter((item) => item.id !== (action as IDeleteToppingFromConstructor).id),
      }
    }
    case CONTRUCTOR.CHANGE_TOPPING_POSITION: {
      const toppings = [...state.toppings]
      toppings.splice((action as IChangeToppingsPosition).toIndex, 0, toppings.splice((action as IChangeToppingsPosition).fromIndex, 1)[0])
      return {
        ...state,
        toppings: toppings
      }
    }
    case CONTRUCTOR.RESET: {
      return initialState
    }
    default:
      return state;
  }
}