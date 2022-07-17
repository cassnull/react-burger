import { TIngredientsData } from "../../utils/types"

export const INGREDIEN_DETAILS = Object.freeze({
  SHOW: 'SHOW_INGREDIEN_DETAILS',
  HIDE: 'HIDE_INGREDIEN_DETAILS',
})

export interface IOpenIngredientDetails {
  readonly type: typeof INGREDIEN_DETAILS.SHOW,
  readonly ingredient: TIngredientsData
}

export interface ICloseIngredientDetails {
  readonly type: typeof INGREDIEN_DETAILS.HIDE
}

export function openIngredientDetails(payload: TIngredientsData): IOpenIngredientDetails {
  return {
    type: INGREDIEN_DETAILS.SHOW,
    ingredient: payload,
  }
}

export function closeIngredientDetails(): ICloseIngredientDetails {
  return {
    type: INGREDIEN_DETAILS.HIDE,
  }
}
