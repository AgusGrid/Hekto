import { Injectable, signal, computed, effect } from '@angular/core';
import { CartItem, CartState } from '@app/models/cart-item.model';
import { Product } from '@app/models/product-lister.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly STORAGE_KEY = 'cart_items';
  
  private cartItems = signal<CartItem[]>(this.loadCartFromStorage());

  constructor() {
    // Guardar en localStorage cada vez que cambie el carrito
    effect(() => {
      const items = this.cartItems();
      this.saveCartToStorage(items);
    });
  }

  private loadCartFromStorage(): CartItem[] {
    if (typeof window === 'undefined' || !window.localStorage) {
      return [];
    }
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
    }
    return [];
  }

  private saveCartToStorage(items: CartItem[]): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }

  totalItems = computed(() => {
    return this.cartItems().reduce((total, item) => total + item.quantity, 0);
  });

  totalPrice = computed(() => {
    return this.cartItems().reduce((total, item) => {
      const price = parseFloat(item.product.discountPrice.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  });

  cartState = computed<CartState>(() => ({
    items: this.cartItems(),
    totalItems: this.totalItems(),
    totalPrice: this.totalPrice()
  }));

  addItem(product: Product, quantity?: number): void {
    if (!quantity) quantity = 1;

    const currentItems = this.cartItems();
    
    const existingItemIndex = currentItems.findIndex(
      item => item.product.id === product.id
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...currentItems];
      const newQuantity = updatedItems[existingItemIndex].quantity + quantity;
      const price = parseFloat(product.discountPrice.replace('$', ''));
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: newQuantity,
        totalPrice: price * newQuantity
      };
      this.cartItems.set(updatedItems);
    } else {
      const price = parseFloat(product.discountPrice.replace('$', ''));
      this.cartItems.set([
        ...currentItems,
        { product, quantity, totalPrice: price * quantity, image: product.image }
      ]);
    }
  }

  removeItem(productId: string | number): void {
    this.cartItems.set(
      this.cartItems().filter(item => item.product.id !== productId)
    );
  }

  updateQuantity(productId: string | number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    const updatedItems = this.cartItems().map(item => {
      if (item.product.id === productId) {
        const price = parseFloat(item.product.discountPrice.replace('$', ''));
        return { 
          ...item, 
          quantity,
          totalPrice: price * quantity
        };
      }
      return item;
    });
    this.cartItems.set(updatedItems);
  }
  clearCart(): void {
    this.cartItems.set([]);
  }

  getItem(productId: string | number): CartItem | undefined {
    return this.cartItems().find(item => item.product.id === productId);
  }

  isInCart(productId: string | number): boolean {
    return this.getItem(productId) !== undefined;
  }
}