export type TIngredientsData = {
    id: string,
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
}

export type TOrderData = {
    bun: TIngredientsData,
    toppings: Array<TIngredientsData>,
}

export enum EIngredient {
    BUN = 'bun',
    SAUCE = 'sauce',
    MAIN = 'main',
}

export type TLocationDetails = {
    details?: any;
}

export type TAuth = {
    email: string
    password: string
}

export type TAuthRegister = TAuth & { name: string }

export type TUserData = Omit<TAuthRegister, 'password'>

export type TPasswordReset = {
    email: string
}

export type TPasswordResetReset = TPasswordReset & TToken

export type TToken = {
    token: string
}

export type TLocationState = {
    from: {
        pathname: string;
    }
}
