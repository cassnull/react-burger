import { AppDispatch } from '../../index'
import * as api from '../../services/api'
import { TIngredientsData } from '../../utils/types'
import { TypedThunk } from '../hooks'
import { resetConstructor } from './constructorAction'

export const ORDER = Object.freeze({
  GET_REQUEST: 'GET_ORDER_REQUEST',
  GET_SUCCESS: 'GET_ORDER_SUCCESS',
  GET_FAILED: 'GET_ORDER_FAILED',
})

export interface ICreateOrderRequest {
  readonly type: typeof ORDER.GET_REQUEST
  readonly ingredients: TIngredientsData[]
}

export interface ICreateOrderSuccess {
  readonly type: typeof ORDER.GET_SUCCESS
  readonly number: string
}

export interface ICreateOrderFailed {
  readonly type: typeof ORDER.GET_FAILED
  error: string
}

export const createOrderRequest = (payload: TIngredientsData[]): ICreateOrderRequest => {
  return {
    type: ORDER.GET_REQUEST,
    ingredients: payload,
  }
}

export const createOrderSuccess = (payload: string): ICreateOrderSuccess => {
  return {
    type: ORDER.GET_SUCCESS,
    number: payload,
  }
}

export const createOrderFailed = (payload: string): ICreateOrderFailed => {
  return {
    type: ORDER.GET_FAILED,
    error: payload,
  }
}

export type TOrderActions = ICreateOrderRequest | ICreateOrderSuccess | ICreateOrderFailed

export const createOrder: TypedThunk = (ingredients: TIngredientsData[]) => {
  return function (dispatch: AppDispatch) {
    dispatch(createOrderRequest(ingredients))
    api.createOrder(ingredients.map(ingredient => ingredient._id))
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