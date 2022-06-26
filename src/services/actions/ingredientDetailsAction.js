export const INGREDIEN_DETAILS = Object.freeze({
  SHOW: 'SHOW_INGREDIEN_DETAILS',
  HIDE: 'HIDE_INGREDIEN_DETAILS',
})

export function openIngredientDetails(payload) {
  return {
    type: INGREDIEN_DETAILS.SHOW,
    ingredient: payload,
  }
}

export function closeIngredientDetails() {
  return {
    type: INGREDIEN_DETAILS.HIDE,
  }
}