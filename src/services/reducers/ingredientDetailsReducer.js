import { INGREDIEN_DETAILS } from '../actions/ingredientDetailsAction'

const initialState = {
  ingredient: {},
  isOpen: false,
}

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIEN_DETAILS.SHOW:
      return {
        ...state,
        ingredient: action.ingredient,
        isOpen: true,
      };
    case INGREDIEN_DETAILS.HIDE:
      return {
        ...state,
        ingredient: undefined,
        isOpen: false,
      };

    default:
      return state;
  }
}
