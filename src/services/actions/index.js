import * as api from '../../services/api'
import { nanoid } from 'nanoid'

export const INGREDIENS = Object.freeze({
  GET_REQUEST: 'GET_INGREDIENS_REQUEST',
  GET_SUCCESS: 'GET_INGREDIENS_SUCCESS',
  GET_FAILED: 'GET_INGREDIENS_FAILED',
})

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: INGREDIENS.GET_REQUEST,
    })
    api.getIngredients()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: INGREDIENS.GET_SUCCESS,
            ingredients: res.data,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: INGREDIENS.GET_FAILED,
          error: err.message,
        })
      })
  }
}

export const INGREDIEN_DETAILS = Object.freeze({
  SET: 'SET_INGREDIEN_DETAILS',
  RESET: 'RESET_INGREDIEN_DETAILS',
  GET_FAILED: 'GET_INGREDIEN_DETAILS_FAILED',
})

export function openIngredientDetails(ingredient) {
  return {
    type: INGREDIEN_DETAILS.SET,
    ingredient,
  }
}

export function closeIngredientDetails() {
  return {
    type: INGREDIEN_DETAILS.RESET,
  }
}

export const CONTRUCTOR = Object.freeze({
  ADD_BUN: 'ADD_BUN',
  ADD_TOPPING: 'ADD_TOPPING',
  DELETE_TOPPING: 'DELETE_TOPPING',
  CHANGE_TOPPING_POSITION: 'CHANGE_TOPPING_POSITION',
})

export const addBunToConstructor = (ingredient) => ({
  type: CONTRUCTOR.ADD_BUN,
  ingredient: { ...ingredient },
})

export const addToppingToConstructor = (ingredient) => ({
  type: CONTRUCTOR.ADD_TOPPING,
  ingredient: { ...ingredient, id: nanoid() },
})

export const deleteToppingFromConstructor = (id) => ({
  type: CONTRUCTOR.DELETE_TOPPING,
  id,
})

export const changeToppingsPosition = (toIndex, fromIndex) => ({
  type: CONTRUCTOR.CHANGE_TOPPING_POSITION,
  toIndex,
  fromIndex,
})

export const ORDER = Object.freeze({
  GET_REQUEST: 'GET_ORDER_REQUEST',
  GET_SUCCESS: 'GET_ORDER_SUCCESS',
  GET_FAILED: 'GET_ORDER_FAILED',
})

export function createOrder(ingredients) {
  return function (dispatch) {
    dispatch({
      type: ORDER.GET_REQUEST,
      ingredients,
    })
    api.createOrder(ingredients.map((ingredient) => ingredient._id))
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: ORDER.GET_SUCCESS,
            number: res.order.number,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: ORDER.GET_FAILED,
          error: err.message
        });
      })
  }
}