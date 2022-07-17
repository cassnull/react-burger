import { AppDispatch } from '../../index'
import * as api from '../../services/api'
import { setCookie, deleteCookie } from '../../utils/cookie'
import { TUserData, TPasswordReset, TPasswordResetReset, TToken, TAuth, TAuthRegister } from '../../utils/types'
import { TypedThunk } from '../hooks'

export const AUTH = Object.freeze({
  REGISTER_REQUEST: 'AUTH_REGISTER_REQUEST',
  REGISTER_SUCCESS: 'AUTH_REGISTER_SUCCESS',
  REGISTER_FAILED: 'AUTH_REGISTER_FAILED',
  LOGIN_REQUEST: 'AUTH_LOGIN_REQUEST',
  LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
  LOGIN_FAILED: 'AUTH_LOGIN_FAILED',
  PASSWORD_RESET_REQUEST: 'AUTH_PASSWORD_RESET_REQUEST',
  PASSWORD_RESET_SUCCESS: 'AUTH_PASSWORD_RESET_SUCCESS',
  PASSWORD_RESET_FAILED: 'AUTH_PASSWORD_RESET_FAILED',
  PASSWORD_RESET_RESET_REQUEST: 'AUTH_PASSWORD_RESET_RESET_REQUEST',
  PASSWORD_RESET_RESET_SUCCESS: 'AUTH_PASSWORD_RESET_RESET_SUCCESS',
  PASSWORD_RESET_RESET_FAILED: 'AUTH_PASSWORD_RESET_RESET_FAILED',
  LOGOUT_REQUEST: 'AUTH_LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'AUTH_LOGOUT_SUCCESS',
  LOGOUT_FAILED: 'AUTH_LOGOUT_FAILED',
  USER_REQUEST: 'AUTH_USER_REQUEST',
  USER_SUCCESS: 'AUTH_USER_SUCCESS',
  USER_FAILED: 'AUTH_USER_FAILED',
  UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILED: 'UPDATE_USER_FAILED',
})

export interface IAuthRegisterRequest {
  readonly type: typeof AUTH.REGISTER_REQUEST
}

export interface IAuthRegisterSuccess {
  readonly type: typeof AUTH.REGISTER_SUCCESS
  readonly payload: TUserData
}

export interface IAuthRegisterFailed {
  readonly type: typeof AUTH.REGISTER_FAILED
  error: string
}

export const authRegisterRequest = (): IAuthRegisterRequest => {
  return {
    type: AUTH.REGISTER_REQUEST,
  }
}

export const authRegisterSuccess = (payload: TUserData): IAuthRegisterSuccess => {
  return {
    type: AUTH.REGISTER_SUCCESS,
    payload,
  }
}

export const authRegisterFailed = (payload: string): IAuthRegisterFailed => {
  return {
    type: AUTH.REGISTER_FAILED,
    error: payload,
  }
}

export type TUserDataRegisterActions = IAuthRegisterRequest | IAuthRegisterSuccess | IAuthRegisterFailed

export interface IAuthLoginRequest {
  readonly type: typeof AUTH.LOGIN_REQUEST
}

export interface IAuthLoginSuccess {
  readonly type: typeof AUTH.LOGIN_SUCCESS
  readonly payload: TUserData
}

export interface IAuthLoginFailed {
  readonly type: typeof AUTH.LOGIN_FAILED
  error: string
}

export const authLoginRequest = (): IAuthLoginRequest => {
  return {
    type: AUTH.LOGIN_REQUEST,
  }
}

export const authLoginSuccess = (payload: TUserData): IAuthLoginSuccess => {
  return {
    type: AUTH.LOGIN_SUCCESS,
    payload,
  }
}

export const authLoginFailed = (payload: string): IAuthLoginFailed => {
  return {
    type: AUTH.LOGIN_FAILED,
    error: payload,
  }
}

export type TUserDataLoginActions = IAuthLoginRequest | IAuthLoginSuccess | IAuthLoginFailed

export interface IPasswordResetRequest {
  readonly type: typeof AUTH.PASSWORD_RESET_REQUEST
}

export interface IPasswordResetSuccess {
  readonly type: typeof AUTH.PASSWORD_RESET_SUCCESS
}

export interface IPasswordResetFailed {
  readonly type: typeof AUTH.PASSWORD_RESET_FAILED
  error: string
}

export const passwordResetRequest = (): IPasswordResetRequest => {
  return {
    type: AUTH.PASSWORD_RESET_REQUEST,
  }
}

export const passwordResetSuccess = (): IPasswordResetSuccess => {
  return {
    type: AUTH.PASSWORD_RESET_SUCCESS,
  }
}

export const passwordResetFailed = (payload: string): IPasswordResetFailed => {
  return {
    type: AUTH.PASSWORD_RESET_FAILED,
    error: payload,
  }
}

export type TPasswordResetActions = IPasswordResetRequest | IPasswordResetSuccess | IPasswordResetFailed

export interface IPasswordResetResetRequest {
  readonly type: typeof AUTH.PASSWORD_RESET_RESET_REQUEST
}

export interface IPasswordResetResetSuccess {
  readonly type: typeof AUTH.PASSWORD_RESET_RESET_SUCCESS
}

export interface IPasswordResetResetFailed {
  readonly type: typeof AUTH.PASSWORD_RESET_RESET_FAILED
  error: string
}

export const passwordResetResetRequest = (): IPasswordResetResetRequest => {
  return {
    type: AUTH.PASSWORD_RESET_RESET_REQUEST,
  }
}

export const passwordResetResetSuccess = (): IPasswordResetResetSuccess => {
  return {
    type: AUTH.PASSWORD_RESET_RESET_SUCCESS,
  }
}

export const passwordResetResetFailed = (payload: string): IPasswordResetResetFailed => {
  return {
    type: AUTH.PASSWORD_RESET_RESET_FAILED,
    error: payload,
  }
}

export type TPasswordResetResetActions = IPasswordResetResetRequest | IPasswordResetResetSuccess | IPasswordResetResetFailed

export interface IAuthLogoutRequest {
  readonly type: typeof AUTH.LOGOUT_REQUEST
}

export interface IAuthLogoutSuccess {
  readonly type: typeof AUTH.LOGOUT_SUCCESS
}

export interface IAuthLogoutFailed {
  readonly type: typeof AUTH.LOGOUT_FAILED
  error: string
}

export const authLogoutRequest = (): IAuthLogoutRequest => {
  return {
    type: AUTH.LOGOUT_REQUEST,
  }
}

export const authLogoutSuccess = (): IAuthLogoutSuccess => {
  return {
    type: AUTH.LOGOUT_SUCCESS,
  }
}

export const authLogoutFailed = (payload: string): IAuthLogoutFailed => {
  return {
    type: AUTH.LOGOUT_FAILED,
    error: payload,
  }
}

export type TUserDataLogoutActions = IAuthLogoutRequest | IAuthLogoutSuccess | IAuthLogoutFailed

export interface IAuthUserRequest {
  readonly type: typeof AUTH.USER_REQUEST
}

export interface IAuthUserSuccess {
  readonly type: typeof AUTH.USER_SUCCESS
  payload: TUserData
}

export interface IAuthUserFailed {
  readonly type: typeof AUTH.USER_FAILED
  error: string
}

export const authUserRequest = (): IAuthUserRequest => {
  return {
    type: AUTH.USER_REQUEST,
  }
}

export const authUserSuccess = (payload: TUserData): IAuthUserSuccess => {
  return {
    type: AUTH.USER_SUCCESS,
    payload,
  }
}

export const authUserFailed = (payload: string): IAuthUserFailed => {
  return {
    type: AUTH.USER_FAILED,
    error: payload,
  }
}

export type TUserDataUserActions = IAuthUserRequest | IAuthUserSuccess | IAuthUserFailed

export interface IUpdateUserRequest {
  readonly type: typeof AUTH.UPDATE_USER_REQUEST
}

export interface IUpdateUserSuccess {
  readonly type: typeof AUTH.UPDATE_USER_SUCCESS
  payload: TUserData
}

export interface IUpdateUserFailed {
  readonly type: typeof AUTH.UPDATE_USER_FAILED
  error: string
}

export const updateUserRequest = (): IUpdateUserRequest => {
  return {
    type: AUTH.UPDATE_USER_REQUEST,
  }
}

export const updateUserSuccess = (payload: TUserData): IUpdateUserSuccess => {
  return {
    type: AUTH.UPDATE_USER_SUCCESS,
    payload,
  }
}

export const updateUserFailed = (payload: string): IUpdateUserFailed => {
  return {
    type: AUTH.UPDATE_USER_FAILED,
    error: payload,
  }
}

export type TUpdateUserActions = IUpdateUserRequest | IUpdateUserSuccess | IUpdateUserFailed

export const authRegister: TypedThunk = (authData: TAuthRegister) => {
  return function (dispatch: AppDispatch) {
    dispatch(authRegisterRequest());
    api.registration(authData)
      .then((res) => {
        if (res && res.success) {
          dispatch(authRegisterSuccess(res.user));
        } else {
          dispatch(authRegisterFailed(res.message))
        }
      })
      .catch((err) => {
        dispatch(authRegisterFailed(err))
      })
  }
}

export const authLogin: TypedThunk = (loginData: TAuth) => {
  return function (dispatch: AppDispatch) {
    dispatch(authLoginRequest())
    api.signIn(loginData)
      .then((res) => {
        if (res && res.success) {
          const authToken = res.accessToken.split('Bearer ')[1]
          setCookie('token', authToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          dispatch(authLoginSuccess(res.user));
        } else {
          dispatch(authLoginFailed(res.message))
        }
      })
      .catch((err) => {
        dispatch(authLoginFailed(err))
      })
  }
}

export const passwordReset: TypedThunk = (resetData: TPasswordReset) => {
  return function (dispatch: AppDispatch) {
    dispatch(passwordResetRequest())
    api.passwordReset(resetData)
      .then((res) => {
        if (res && res.success) {
          dispatch(passwordResetSuccess())
        } else {
          dispatch(passwordResetFailed(res.message))
        }
      })
      .catch((err) => {
        dispatch(passwordResetFailed(err))
      })
  }
}

export const passwordResetReset: TypedThunk = (resetData: TPasswordResetReset) => {
  return function (dispatch: AppDispatch) {
    dispatch(passwordResetResetRequest())
    api.passwordResetReset(resetData)
      .then((res) => {
        if (res && res.success) {
          dispatch(passwordResetResetSuccess())
        } else {
          dispatch(passwordResetResetFailed(res.message))
        }
      })
      .catch((err) => {
        dispatch(passwordResetResetFailed(err))
      })
  }
}

export const authLogout: TypedThunk = (logoutData: TToken) => {
  return function (dispatch: AppDispatch) {
    dispatch(authLogoutRequest())
    api.logout(logoutData)
      .then((res) => {
        if (res && res.success) {
          deleteCookie('token')
          dispatch(authLogoutSuccess())
        } else {
          dispatch(authLogoutFailed(res.message))
        }
      })
      .catch((err) => {
        dispatch(authLogoutFailed(err))
      })
  }
}


export const getUser: TypedThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(authUserRequest())
    api.getUser()
      .then((res) => {
        if (res && res.success) {
          dispatch(authUserSuccess(res.user))
        } else {
          dispatch(authUserFailed(res.message))
        }
      })
      .catch((err) => {
        dispatch(authUserFailed(err))
      })
  }
}

export const updateUser: TypedThunk = (userData: TUserData) => {
  return function (dispatch: AppDispatch) {
    dispatch(updateUserRequest())
    api.updateUser(userData)
      .then((res) => {
        if (res && res.success) {
          dispatch(updateUserSuccess(res.user))
        } else {
          dispatch(updateUserFailed(res.message))
        }
      })
      .catch((err) => {
        dispatch(updateUserFailed(err))
      })
  }
}
