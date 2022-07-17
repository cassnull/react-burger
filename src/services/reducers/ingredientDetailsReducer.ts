import { TIngredientsData } from '../../utils/types';
import { ICloseIngredientDetails, INGREDIEN_DETAILS, IOpenIngredientDetails } from '../actions/ingredientDetailsAction'

type TIngredientDetailsState = {
  ingredient: TIngredientsData
  isOpen: boolean
}

const initialState: TIngredientDetailsState = {
  ingredient: {} as TIngredientsData,
  isOpen: false,
}

export type TIngredientDetailsAction = IOpenIngredientDetails | ICloseIngredientDetails

export const ingredientDetailsReducer = (state = initialState, action: TIngredientDetailsAction) => {
  switch (action.type) {
    case INGREDIEN_DETAILS.SHOW:
      return {
        ...state,
        ingredient: (action as IOpenIngredientDetails).ingredient,
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
