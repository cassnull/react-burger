import * as api from '../../services/api'
import { setCookie, deleteCookie } from '../../utils/cookie'

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

export const authRegisterRequest = () => {
  return {
    type: AUTH.REGISTER_REQUEST,
  }
}

export const authRegisterSuccess = (payload) => {
  return {
    type: AUTH.REGISTER_SUCCESS,
    payload,
  }
}

export const authRegisterFailed = (payload) => {
  return {
    type: AUTH.REGISTER_FAILED,
    error: payload,
  }
}

export const authLoginRequest = () => {
  return {
    type: AUTH.LOGIN_REQUEST,
  }
}

export const authLoginSuccess = (payload) => {
  return {
    type: AUTH.LOGIN_SUCCESS,
    payload,
  }
}

export const authLoginFailed = (payload) => {
  return {
    type: AUTH.LOGIN_FAILED,
    error: payload,
  }
}

export const passwordResetRequest = () => {
  return {
    type: AUTH.PASSWORD_RESET_REQUEST,
  }
}

export const passwordResetSuccess = () => {
  return {
    type: AUTH.PASSWORD_RESET_SUCCESS,
  }
}

export const passwordResetFailed = (payload) => {
  return {
    type: AUTH.PASSWORD_RESET_FAILED,
    error: payload,
  }
}

export const passwordResetResetRequest = () => {
  return {
    type: AUTH.PASSWORD_RESET_RESET_REQUEST,
  }
}

export const passwordResetResetSuccess = () => {
  return {
    type: AUTH.PASSWORD_RESET_RESET_SUCCESS,
  }
}

export const passwordResetResetFailed = (payload) => {
  return {
    type: AUTH.PASSWORD_RESET_RESET_FAILED,
    error: payload,
  }
}

export const authLogoutRequest = () => {
  return {
    type: AUTH.LOGOUT_REQUEST,
  }
}

export const authLogoutSuccess = () => {
  return {
    type: AUTH.LOGOUT_SUCCESS,
  }
}

export const authLogoutFailed = (payload) => {
  return {
    type: AUTH.LOGOUT_FAILED,
    error: payload,
  }
}

export const authUserRequest = () => {
  return {
    type: AUTH.USER_REQUEST,
  }
}

export const authUserSuccess = (payload) => {
  return {
    type: AUTH.USER_SUCCESS,
    payload,
  }
}

export const authUserFailed = (payload) => {
  return {
    type: AUTH.USER_FAILED,
    error: payload,
  }
}

export const updateUserRequest = () => {
  return {
    type: AUTH.UPDATE_USER_REQUEST,
  }
}

export const updateUserSuccess = (payload) => {
  return {
    type: AUTH.UPDATE_USER_SUCCESS,
    payload,
  }
}

export const updateUserFailed = (payload) => {
  return {
    type: AUTH.UPDATE_USER_FAILED,
    error: payload,
  }
}

export function authRegister(authData) {
  return function (dispatch) {
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

export function authLogin(loginData) {
  return function (dispatch) {
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

export function passwordReset(resetData) {
  return function (dispatch) {
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

export function passwordResetReset(resetData) {
  return function (dispatch) {
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

export function authLogout(logoutData) {
  return function (dispatch) {
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


export function getUser() {
  return function (dispatch) {
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

export function updateUser(userData) {
  return function (dispatch) {
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