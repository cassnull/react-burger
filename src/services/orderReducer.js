import { ingredientType } from '../utils/types'

export const orderInitialState = {
  name: null,
  number: null,
  bun: {
    "_id": "60d3b41abdacab0026a733c6",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
  },
  toppings: [
    {
      "_id": "60d3b41abdacab0026a733c8",
      "name": "Филе Люминесцентного тетраодонтимформа",
      "type": "main",
      "proteins": 44,
      "fat": 26,
      "carbohydrates": 85,
      "calories": 643,
      "price": 988,
      "image": "https://code.s3.yandex.net/react/code/meat-03.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
      "__v": 0
    },
  ],
  total: 0,
}

const total = (bun, toppings) => {
  let total = bun ? bun.price * 2 : 0;
  return toppings.reduce((previousValue, ingr) => previousValue + ingr.price, total)
}

export const orderReducer = (state = orderInitialState, action) => {
  switch (action.type) {
    case "setBun": {
      if (action.data.type !== ingredientType.BUN) return
      return {
        ...state,
        bun: action.data,
        total: total(action.data, state),
      }
    }
    case "addTopping": {
      if (action.payload.type === ingredientType.BUN) return
      const toppings = [...state.toppings, action.payload]
      return {
        ...state,
        toppings,
        total: total(action.data, toppings),
      }
    }
    case "removeIngredient": {
      const toppings = state.toppings.filter((_, id) => id !== action.payload.id)
      return {
        ...state,
        toppings: toppings,
        total: total(action.data, toppings),
      }
    }
    case "setNumber": {
      return {
        ...state,
        number: action.data.order.number,
        name: action.data.name,
      }
    }
    default:
      return state
  }
}