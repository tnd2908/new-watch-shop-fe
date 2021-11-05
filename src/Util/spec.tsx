export interface Detail {
    _id: string,
    name: string,
    images: [any],
    price: number,
    description: string,
    color: string,
    category: {
        name: string,
        gender: string
    },
    size: string,
    weight: string,
    material: string,
    comment: [],
    quantity: number,
    saleOf: number,
}
export interface IUSer {
    userInfor: {
        firstName: string,
        lastName: string,
        phone: number,
        gender: string,
        userId?: string,
        email: string,
        ava: string,
    },
    auth: boolean,
    cart: Array<any>,
}
export type Params = {
    id?: string;
    productName?: string;
};
export type Action = {
    type: string,
    payload: any
}