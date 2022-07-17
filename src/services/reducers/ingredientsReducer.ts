import { EIngredient, TIngredientsData } from '../../utils/types';
import { INGREDIENS, IGetIngredientsFailed, IGetIngredientsSuccess, IGetIngredientsRequest } from '../actions/ingredientsAction'

type TIngredientsState = {
  ingredients: TIngredientsData[]
  currentTab: EIngredient
  request: boolean
  failed: boolean
  error?: string
}

const initialState: TIngredientsState = {
  ingredients: [],
  currentTab: EIngredient.BUN,
  request: false,
  failed: false,
  error: undefined,
}

export type TIngredientsAction = IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed

export const ingredientsReducer = (state = initialState, action: TIngredientsAction) => {
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
        ingredients: (action as IGetIngredientsSuccess).ingredients,
        request: false,
        failed: false,
        error: undefined,
      };
    }
    case INGREDIENS.GET_FAILED: {
      return {
        ...state,
        request: false,
        failed: true,
        error: (action as IGetIngredientsFailed).error,
      };
    }
    default:
      return state;
  }
}