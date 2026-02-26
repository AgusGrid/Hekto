export interface Product {
    id?: string | number;
    image: string;
    title: string;
    price: string;
    discountPrice: string;
    rating: number;
    reviews: number;
    brand: string;
    category: string;
    description: string;
    cashback?: string;
    discountOffer?: string;
}