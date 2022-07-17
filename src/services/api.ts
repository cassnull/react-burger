import { ENDPOINTS, METHOD } from '../utils/constants'
import { setCookie, getCookie } from '../utils/cookie'
import { TAuth, TAuthRegister, TPasswordReset, TPasswordResetReset, TToken, TUserData } from '../utils/types';

const headers = {
    'Accept': 'application/json'
};

function checkResponse(res: Response) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`)
}

function corsRequest(url: string, value: TAuthRegister | TAuth | TPasswordReset | TToken) {
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

async function fetchWithToken(url: any, init: any) {
    try {
        const res = await fetch(url, init)
        return await checkResponse(res)
    } catch (err) {
        if (err instanceof Error && err.message === 'jwt expired') {
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

export const createOrder = (ingredients: string[]) => fetch(ENDPOINTS.ORDERS,
    {
        method: METHOD.POST,
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients }),
    })
    .then(checkResponse)

export const registration = (registerData: TAuthRegister) => corsRequest(ENDPOINTS.AUTH_REGISTER, registerData)

export const signIn = (loginData: TAuth) => corsRequest(ENDPOINTS.AUTH_LOGIN, loginData)

export const passwordReset = (resetData: TPasswordReset) => corsRequest(ENDPOINTS.PASSWORD_RESET, resetData)

export const passwordResetReset = (resetData: TPasswordResetReset) => corsRequest(ENDPOINTS.PASSWORD_RESET_RESET, resetData)

export const logout = (logoutData: TToken) => corsRequest(ENDPOINTS.AUTH_LOGOUT, logoutData)

export const refreshToken = () => corsRequest(ENDPOINTS.AUTH_LOGOUT, ({
    token: localStorage.getItem('refreshToken')!,
}))

export const getUser = () => fetchWithToken(ENDPOINTS.AUTH_USER,
    {
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('token')}`
        },
    })

export const updateUser = (data: TUserData) => fetchWithToken(ENDPOINTS.AUTH_USER,
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