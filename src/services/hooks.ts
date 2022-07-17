import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux'
import { Action, ActionCreator } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AppDispatch, ReduxState } from '../index'
import { TAuthAction } from './reducers/authReducer'
import { TConstructorAction } from './reducers/burgerConstructorReducer'
import { TIngredientDetailsAction } from './reducers/ingredientDetailsReducer'
import { TIngredientsAction } from './reducers/ingredientsReducer'
import { TOrderAction } from './reducers/orderReducer'

type TApplicationActions = TAuthAction & TConstructorAction & TIngredientDetailsAction & TIngredientsAction & TOrderAction

type TDispatch = ThunkDispatch<ReduxState, any, TApplicationActions>

export type TypedThunk =
  | TDispatch
  | ActionCreator<ThunkAction<void, Action, ReduxState, TApplicationActions>>
export const useDispatch = () => dispatchHook<AppDispatch | TDispatch>()
export const useSelector: TypedUseSelectorHook<ReduxState> = selectorHook