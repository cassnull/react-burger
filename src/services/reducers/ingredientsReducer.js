import { INGREDIENS } from '../actions/index'

const initialState = {
  ingredients: [],
  currentTab: 'buns',
  request: false,
  failed: false,
  error: undefined,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENS.GET_REQUEST: {
      return {
        ...state,
        request: true,
      };
    }
    case INGREDIENS.GET_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        request: false,
        failed: false,
        error: undefined,
      };
    }
    case INGREDIENS.GET_FAILED: {
      return {
        ...state,
        request: false,
        failed: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
}