import { CONTRUCTOR } from '../actions/constructorAction'

const initialState = {
  bun: undefined,
  toppings: [],
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTRUCTOR.ADD_BUN: {
      return {
        ...state,
        bun: action.ingredient,
      }
    }
    case CONTRUCTOR.ADD_TOPPING: {
      return {
        ...state,
        toppings: [...state.toppings, action.ingredient],
      }
    }
    case CONTRUCTOR.DELETE_TOPPING: {
      return {
        ...state,
        toppings: [...state.toppings].filter((item) => item.id !== action.id),
      }
    }
    case CONTRUCTOR.CHANGE_TOPPING_POSITION: {
      const toppings = [...state.toppings]
      toppings.splice(action.toIndex, 0, toppings.splice(action.fromIndex, 1)[0])
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