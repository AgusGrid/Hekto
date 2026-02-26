import { Product } from './product-lister.model';

export interface CartItem {
  product: Product;
  quantity: number;
  totalPrice: number;
  image: string;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}