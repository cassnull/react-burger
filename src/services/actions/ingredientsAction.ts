import { AppDispatch } from '../../index'
import * as api from '../../services/api'
import { TIngredientsData } from '../../utils/types'
import { TypedThunk } from '../hooks'

export const INGREDIENS = Object.freeze({
  GET_REQUEST: 'GET_INGREDIENS_REQUEST',
  GET_SUCCESS: 'GET_INGREDIENS_SUCCESS',
  GET_FAILED: 'GET_INGREDIENS_FAILED',
})

export interface IGetIngredientsRequest {
  readonly type: typeof INGREDIENS.GET_REQUEST
}

export interface IGetIngredientsSuccess {
  readonly type: typeof INGREDIENS.GET_SUCCESS
  readonly ingredients: TIngredientsData[];
}

export interface IGetIngredientsFailed {
  readonly type: typeof INGREDIENS.GET_FAILED
  error: string
}

export const getIngredientsRequest = (): IGetIngredientsRequest => {
  return {
    type: INGREDIENS.GET_REQUEST,
  }
}

export const getIngredientsSuccess = (payload: TIngredientsData[]): IGetIngredientsSuccess => {
  return {
    type: INGREDIENS.GET_SUCCESS,
    ingredients: payload,
  }
}

export const getIngredientsFailed = (payload: string): IGetIngredientsFailed => {
  return {
    type: INGREDIENS.GET_FAILED,
    error: payload,
  }
}

export type TIngredientsActions = IGetIngredientsRequest | IGetIngredientsSuccess | IGetIngredientsFailed

export const getIngredients: TypedThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getIngredientsRequest())
    api.getIngredients()
      .then((res) => {
        if (res && res.success) {
          dispatch(getIngredientsSuccess(res.data))
        }
      })
      .catch((err) => {
        dispatch(getIngredientsFailed(err.message))
      })
  }
}
