import * as api from '../../services/api'
import { resetConstructor } from './constructorAction'

export const ORDER = Object.freeze({
  GET_REQUEST: 'GET_ORDER_REQUEST',
  GET_SUCCESS: 'GET_ORDER_SUCCESS',
  GET_FAILED: 'GET_ORDER_FAILED',
})

export const createOrderRequest = (payload) => {
  return {
    type: ORDER.GET_REQUEST,
    ingredients: payload,
  }
}

export const createOrderSuccess = (payload) => {
  return {
    type: ORDER.GET_SUCCESS,
    number: payload,
  }
}

export const createOrderFailed = (payload) => {
  return {
    type: ORDER.GET_FAILED,
    error: payload,
  }
}

export function createOrder(ingredients) {
  return function (dispatch) {
    dispatch(createOrderRequest(ingredients))
    api.createOrder(ingredients.map((ingredient) => ingredient._id))
      .then((res) => {
        if (res && res.success) {
          dispatch(createOrderSuccess(res.order.number))
          dispatch(resetConstructor())
        }
      })
      .catch((err) => {
        dispatch(createOrderFailed(err.message))
      })
  }
}