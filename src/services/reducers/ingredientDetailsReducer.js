import { INGREDIEN_DETAILS } from '../actions/index'

const initialState = {
  ingredient: {},
  isOpen: false,
}

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIEN_DETAILS.SET:
      return {
        ...state,
        ingredient: action.ingredient,
        isOpen: true,
      };
    case INGREDIEN_DETAILS.RESET:
      return {
        ...state,
        ingredient: undefined,
        isOpen: false,
      };

    default:
      return state;
  }
}