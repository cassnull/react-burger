import { nanoid } from 'nanoid'
import { TIngredientsData } from '../../utils/types'

export const CONTRUCTOR = Object.freeze({
  ADD_BUN: 'ADD_BUN',
  ADD_TOPPING: 'ADD_TOPPING',
  DELETE_TOPPING: 'DELETE_TOPPING',
  CHANGE_TOPPING_POSITION: 'CHANGE_TOPPING_POSITION',
  RESET: 'RESET',
})

export interface IAddBunToConstructor {
  readonly type: typeof CONTRUCTOR.ADD_BUN
  ingredient: TIngredientsData
}

export interface IAddToppingToConstructor {
  readonly type: typeof CONTRUCTOR.ADD_TOPPING
  ingredient: TIngredientsData
}

export interface IDeleteToppingFromConstructor {
  readonly type: typeof CONTRUCTOR.DELETE_TOPPING
  id: string
}

export interface IChangeToppingsPosition {
  readonly type: typeof CONTRUCTOR.CHANGE_TOPPING_POSITION
  toIndex: number
  fromIndex: number
}

export interface IResetConstructor {
  readonly type: typeof CONTRUCTOR.RESET
}

export const addBunToConstructor = (payload: TIngredientsData) => ({
  type: CONTRUCTOR.ADD_BUN,
  ingredient: { ...payload },
})

export const addToppingToConstructor = (payload: TIngredientsData) => ({
  type: CONTRUCTOR.ADD_TOPPING,
  ingredient: { ...payload, id: nanoid() },
})

export const deleteToppingFromConstructor = (id: any): IDeleteToppingFromConstructor => ({
  type: CONTRUCTOR.DELETE_TOPPING,
  id,
})

export const changeToppingsPosition = (toIndex: number, fromIndex: number): IChangeToppingsPosition => ({
  type: CONTRUCTOR.CHANGE_TOPPING_POSITION,
  toIndex,
  fromIndex,
})

export const resetConstructor = (): IResetConstructor => ({
  type: CONTRUCTOR.RESET,
})
