import { ICreateOrderFailed, ICreateOrderRequest, ICreateOrderSuccess, ORDER } from '../actions/orderAction'

type TOrderState = {
  number?: string
  request: boolean
  failed: boolean
  error?: string
}

const initialState: TOrderState = {
  number: undefined,
  request: false,
  failed: false,
  error: undefined,
}

export type TOrderAction = ICreateOrderRequest
  | ICreateOrderSuccess
  | ICreateOrderFailed

export const orderReducer = (state = initialState, action: TOrderAction) => {
  switch (action.type) {
    case ORDER.GET_REQUEST: {
      return {
        ...state,
        request: true,
        ingredients: (action as ICreateOrderRequest).ingredients,
      };
    }
    case ORDER.GET_SUCCESS: {
      return {
        ...state,
        number: (action as ICreateOrderSuccess).number,
        request: false,
        failed: false,
        error: undefined,
      };
    }
    case ORDER.GET_FAILED: {
      return {
        ...state,
        request: false,
        failed: true,
        error: (action as ICreateOrderFailed).error,
      }
    }
    default:
      return state;
  }
}