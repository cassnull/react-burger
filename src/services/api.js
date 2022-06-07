import { ENDPOINTS, METHOD } from '../utils/constants'

const headers = {
    'Accept': 'application/json'
};

function checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`)
}

export const getIngredients = () => fetch(ENDPOINTS.INGREDIENTS,
    { headers })
    .then(checkResponse)

export const createOrder = (ingredients) => fetch(ENDPOINTS.ORDERS,
    {
        method: METHOD.POST,
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients }),
    })
    .then(checkResponse)