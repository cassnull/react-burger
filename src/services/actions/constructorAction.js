import { nanoid } from 'nanoid'

export const CONTRUCTOR = Object.freeze({
  ADD_BUN: 'ADD_BUN',
  ADD_TOPPING: 'ADD_TOPPING',
  DELETE_TOPPING: 'DELETE_TOPPING',
  CHANGE_TOPPING_POSITION: 'CHANGE_TOPPING_POSITION',
  RESET: 'RESET',
})

export const addBunToConstructor = (payload) => ({
  type: CONTRUCTOR.ADD_BUN,
  ingredient: { ...payload },
})

export const addToppingToConstructor = (payload) => ({
  type: CONTRUCTOR.ADD_TOPPING,
  ingredient: { ...payload, id: nanoid() },
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

export const resetConstructor = () => ({
  type: CONTRUCTOR.RESET,
})