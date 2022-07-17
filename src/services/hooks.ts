import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux'
import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppDispatch, ReduxState } from '../index'
import { TAuthAction } from './reducers/authReducer'
import { TConstructorAction } from './reducers/burgerConstructorReducer'
import { TIngredientDetailsAction } from './reducers/ingredientDetailsReducer'
import { TIngredientsAction } from './reducers/ingredientsReducer'
import { TOrderAction } from './reducers/orderReducer'

type TApplicationActions = TAuthAction & TConstructorAction & TIngredientDetailsAction & TIngredientsAction & TOrderAction

export type AppThunk<TReturn = void> = ActionCreator< ThunkAction<TReturn, Action, ReduxState, TApplicationActions> >
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>()
export const useSelector: TypedUseSelectorHook<ReduxState> = selectorHook