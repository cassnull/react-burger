import { ENDPOINTS, METHOD } from '../utils/constants'
import { setCookie, getCookie } from '../utils/cookie'

const headers = {
    'Accept': 'application/json'
};

function checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`)
}

function corsRequest(url, value) {
    return fetch(url,
        {
            method: METHOD.POST,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
        }).then(checkResponse)
}

async function fetchWithToken(url, init) {
    try {
        const res = await fetch(url, init)
        return await checkResponse(res)
    } catch (err) {
        if (err.message === 'jwt expired') {
            const refreshData = await refreshToken()
            if (!refreshData.success) {
                Promise.reject(refreshData)
            }
            localStorage.setItem('refreshToken', refreshData.refreshToken)
            const authToken = refreshData.accessToken.split("Bearer ")[1]
            setCookie('token', authToken)
            init.headers.authorization = refreshData.accessToken
            const res = await fetch(url, init)
            return await checkResponse(res)
        } else {
            return Promise.reject(err)
        }
    }
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

export const registration = (registerData) => corsRequest(ENDPOINTS.AUTH_REGISTER, registerData)

export const signIn = (loginData) => corsRequest(ENDPOINTS.AUTH_LOGIN, loginData)

export const passwordReset = (resetData) => corsRequest(ENDPOINTS.PASSWORD_RESET, resetData)

export const passwordResetReset = (resetData) => corsRequest(ENDPOINTS.PASSWORD_RESET_RESET, resetData)

export const logout = (logoutData) => corsRequest(ENDPOINTS.AUTH_LOGOUT, logoutData)

export const refreshToken = () => corsRequest(ENDPOINTS.AUTH_LOGOUT, ({
    token: localStorage.getItem('refreshToken'),
}))

export const getUser = () => fetchWithToken(ENDPOINTS.AUTH_USER,
    {
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('token')}`
        },
    })

export const updateUser = (data) => fetchWithToken(ENDPOINTS.AUTH_USER,
    {
        method: METHOD.PATCH,
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
        headers: {
            ...headers,
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie('token')}`
        },
    })