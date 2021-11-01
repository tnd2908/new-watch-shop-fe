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
    comment: []
}
export type Params = {
    id?: string;
    productName?: string;
};
