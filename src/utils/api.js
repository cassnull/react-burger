import { API } from './constants'

export const getIngredients = () => fetch(API)
    .then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`)
    })