import { AUTH } from '../actions/authAction'

const initialState = {
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

export const authReducer = (state = initialState, action) => {
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
      const { name, email } = action.payload
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
        error: action.error,
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
      const { name, email } = action.payload;
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
        error: action.error,
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
        error: action.error,
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
        error: action.error,
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
        error: action.error,
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
      const { name, email } = action.payload
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
        error: action.error,
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
      const { name, email } = action.payload;
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