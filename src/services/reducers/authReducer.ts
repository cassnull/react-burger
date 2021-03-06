import { TUserData } from '../../utils/types'
import { AUTH, IAuthLoginFailed, IAuthLoginRequest, IAuthLoginSuccess, IAuthLogoutFailed, IAuthLogoutRequest, IAuthLogoutSuccess, IAuthRegisterFailed, IAuthRegisterRequest, IAuthRegisterSuccess, IAuthUserFailed, IAuthUserRequest, IAuthUserSuccess, IPasswordResetFailed, IPasswordResetRequest, IPasswordResetResetFailed, IPasswordResetResetRequest, IPasswordResetResetSuccess, IPasswordResetSuccess, IUpdateUserFailed, IUpdateUserRequest, IUpdateUserSuccess } from '../actions/authAction'

export type TAuthState = {
  user?: TUserData
  registerRequest: boolean
  registerFailed: boolean
  loginRequest: boolean
  loginFailed: boolean
  passwordResetRequest: boolean
  passwordResetSuccess: boolean
  passwordResetFailed: boolean
  passwordResetResetRequest: boolean
  passwordResetResetSuccess: boolean
  passwordResetResetFailed: boolean
  logoutRequest: boolean
  logoutFailed: boolean
  getUserRequest: boolean
  getUserFailed: boolean
  updateUserRequest: boolean
  updateUserFailed: boolean
  error?: string
}

const initialState: TAuthState = {
  user: undefined,
  registerRequest: false,
  registerFailed: false,
  loginRequest: false,
  loginFailed: false,
  passwordResetRequest: false,
  passwordResetSuccess: false,
  passwordResetFailed: false,
  passwordResetResetRequest: false,
  passwordResetResetSuccess: false,
  passwordResetResetFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  getUserRequest: false,
  getUserFailed: false,
  updateUserRequest: false,
  updateUserFailed: false,
  error: undefined,
}

export type TAuthAction = IAuthRegisterRequest
  | IAuthRegisterSuccess
  | IAuthRegisterFailed
  | IAuthLoginRequest
  | IAuthLoginSuccess
  | IAuthLoginFailed
  | IPasswordResetRequest
  | IPasswordResetSuccess
  | IPasswordResetFailed
  | IPasswordResetResetRequest
  | IPasswordResetResetSuccess
  | IPasswordResetResetFailed
  | IAuthLogoutRequest
  | IAuthLogoutSuccess
  | IAuthLogoutFailed
  | IAuthUserRequest
  | IAuthUserSuccess
  | IAuthUserFailed
  | IUpdateUserRequest
  | IUpdateUserSuccess
  | IUpdateUserFailed

export const authReducer = (state = initialState, action: TAuthAction) => {
  switch (action.type) {
    case AUTH.REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        registerFailed: false,
        error: undefined,
      }
    }
    case AUTH.REGISTER_SUCCESS: {
      const { name, email } = (action as IAuthRegisterSuccess).payload
      return {
        ...state,
        user: { ...state.user, name, email },
        registerRequest: false,
        registerFailed: false,
        error: undefined,
      }
    }
    case AUTH.REGISTER_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: true,
        error: (action as IAuthRegisterFailed).error,
      }
    }
    case AUTH.LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
        error: undefined,
      }
    }
    case AUTH.LOGIN_SUCCESS: {
      const { name, email } = (action as IAuthLoginSuccess).payload;
      return {
        ...state,
        user: { ...state.user, name, email },
        loginRequest: false,
        loginFailed: false,
        error: undefined,
      };
    }
    case AUTH.LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
        error: (action as IAuthLoginFailed).error,
      }
    }
    case AUTH.PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        passwordResetRequest: true,
        passwordResetFailed: false,
        passwordResetSuccess: false,
        error: undefined,
      }
    }
    case AUTH.PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        passwordResetRequest: false,
        passwordResetFailed: false,
        passwordResetSuccess: true,
        error: undefined,
      };
    }
    case AUTH.PASSWORD_RESET_FAILED: {
      return {
        ...state,
        passwordResetRequest: false,
        passwordResetFailed: true,
        passwordResetSuccess: false,
        error: (action as IPasswordResetFailed).error,
      }
    }
    case AUTH.PASSWORD_RESET_RESET_REQUEST: {
      return {
        ...state,
        passwordResetResetRequest: true,
        passwordResetResetFailed: false,
        passwordResetResetSuccess: false,
        error: undefined,
      }
    }
    case AUTH.PASSWORD_RESET_RESET_SUCCESS: {
      return {
        ...state,
        passwordResetResetRequest: false,
        passwordResetResetFailed: false,
        passwordResetResetSuccess: true,
        error: undefined,
      };
    }
    case AUTH.PASSWORD_RESET_RESET_FAILED: {
      return {
        ...state,
        passwordResetResetRequest: false,
        passwordResetResetFailed: true,
        passwordResetResetSuccess: false,
        error: (action as IPasswordResetResetFailed).error,
      }
    }
    case AUTH.LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false,
      };
    }
    case AUTH.LOGOUT_SUCCESS: {
      return {
        ...state,
        user: undefined,
        logoutRequest: false,
        logoutFailed: false,
      }
    }
    case AUTH.LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true,
        error: (action as IAuthLogoutFailed).error,
      }
    }
    case AUTH.USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserFailed: false,
      }
    }
    case AUTH.USER_SUCCESS: {
      const { name, email } = (action as IAuthUserSuccess).payload
      return {
        ...state,
        user: { ...state.user, name, email },
        getUserRequest: false,
        getUserFailed: false,
      }
    }
    case AUTH.USER_FAILED: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: true,
        error: (action as IAuthUserFailed).error,
      }
    }

    case AUTH.UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
        updateUserFailed: false
      }
    }
    case AUTH.UPDATE_USER_SUCCESS: {
      const { name, email } = (action as IUpdateUserSuccess).payload;
      return {
        ...state,
        user: { ...state.user, name, email },
        updateUserRequest: false,
        updateUserFailed: false
      };
    }
    case AUTH.UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserFailed: true
      }
    }
    default:
      return state
  }
}