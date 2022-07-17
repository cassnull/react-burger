const BASE_URL = 'https://norma.nomoreparties.space/api'

export const ENDPOINTS = Object.freeze({
  INGREDIENTS: `${BASE_URL}/ingredients`,
  ORDERS: `${BASE_URL}/orders`,
  AUTH_REGISTER: `${BASE_URL}/auth/register`,
  AUTH_LOGIN: `${BASE_URL}/auth/login`,
  PASSWORD_RESET: `${BASE_URL}/password-reset`,
  PASSWORD_RESET_RESET: `${BASE_URL}/password-reset/reset`,
  AUTH_LOGOUT: `${BASE_URL}/auth/logout`,
  AUTH_USER: `${BASE_URL}/auth/user`,
})

export const METHOD = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
})