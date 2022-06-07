const BASE_URL = 'https://norma.nomoreparties.space/api'

export const ENDPOINTS = Object.freeze({
  INGREDIENTS: `${BASE_URL}/ingredients`,
  ORDERS: `${BASE_URL}/orders`,
})

export const METHOD = Object.freeze({
  GET: 'GET',
  POST: 'POST',
})