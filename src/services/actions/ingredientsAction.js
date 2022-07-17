import * as api from '../../services/api'

export const INGREDIENS = Object.freeze({
  GET_REQUEST: 'GET_INGREDIENS_REQUEST',
  GET_SUCCESS: 'GET_INGREDIENS_SUCCESS',
  GET_FAILED: 'GET_INGREDIENS_FAILED',
})

export const getIngredientsRequest = () => {
  return {
    type: INGREDIENS.GET_REQUEST,
  }
}

export const getIngredientsSuccess = (payload) => {
  return {
    type: INGREDIENS.GET_SUCCESS,
    ingredients: payload,
  }
}

export const getIngredientsFailed = (payload) => {
  return {
    type: INGREDIENS.GET_FAILED,
    error: payload,
  }
}

export function getIngredients() {
  return function (dispatch) {
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