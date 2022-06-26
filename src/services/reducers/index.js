import { combineReducers } from 'redux'
import { orderReducer as order } from "./orderReducer"
import { ingredientsReducer as ingredients } from './ingredientsReducer'
import { burgerConstructorReducer as burgerConstructor } from './burgerConstructorReducer'
import { ingredientDetailsReducer as ingredientDetails } from './ingredientDetailsReducer'

export const rootReducer = combineReducers({
  ingredients,
  burgerConstructor,
  order,
  ingredientDetails,
})