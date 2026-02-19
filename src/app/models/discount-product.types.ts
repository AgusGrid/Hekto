export type DiscountProduct = {
    id: number;
    type: string;
    subtitle: string;
    text: string;
    list: string[];
    img: string;
}

export enum DiscountProductId {
    HEADPHONES = 1,
    LAPTOP = 2,
    OTHER = 3
}