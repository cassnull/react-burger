import { ORDER } from '../actions/orderAction'

const initialState = {
  number: null,
  request: false,
  failed: false,
  error: undefined,
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER.GET_REQUEST: {
      return {
        ...state,
        request: true,
        ingredients: action.ingredients,
      };
    }
    case ORDER.GET_SUCCESS: {
      return {
        ...state,
        number: action.number,
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
        error: action.error,
      }
    }
    default:
      return state;
  }
}