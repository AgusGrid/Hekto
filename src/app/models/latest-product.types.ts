export type LatestProduct = {
    image: string;
    title: string;
    discountPrice: string;
    price: string;
    sale?: boolean;
}

export enum LatestProductCategory {
    NEW_ARRIVAL = 'new-arrival',
    BEST_SELLERS = 'best-sellers',
    FEATURED = 'featured',
    SPECIAL_OFFER = 'special-offer'
}