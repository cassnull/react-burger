export const ingredientsInitialState = {
  ingredients: [],
}

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
  switch (action.type) {
    case "setIngredients":
      return {
        ...state,
        ingredients: action.data
      }
    default:
      return state
  }
}