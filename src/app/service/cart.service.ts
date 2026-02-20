import { Injectable, signal, computed, effect } from '@angular/core';
import { CartItem, CartState } from '@app/models/cart-item.model';
import { Product } from '@app/models/product-lister.model';
import { parsePrice } from '@app/utils/price.util';
import { ProductHelperService } from '@app/service/product-helper.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly STORAGE_KEY = 'cart_items';
  
  private cartItems = signal<CartItem[]>(this.loadCartFromStorage());

  constructor(private productHelper: ProductHelperService) {
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
      return total + item.totalPrice;
    }, 0);
  });

  cartState = computed<CartState>(() => ({
    items: this.cartItems(),
    totalItems: this.totalItems(),
    totalPrice: this.totalPrice()
  }));

  private calculateItemPrice(product: Product, quantity: number): number {
    return parsePrice(product.discountPrice) * quantity;
  }

  private findItemIndex(productId: string | number): number {
    return this.cartItems().findIndex(
      item => item.product.id === productId
    );
  }

  addItem(product: Product, quantity: number = 1): void {
    if (!product?.id) {
      console.warn('Cannot add invalid product to cart');
      return;
    }

    if (quantity <= 0) {
      console.warn('Quantity must be greater than 0');
      return;
    }

    const currentItems = this.cartItems();
    const existingItemIndex = this.findItemIndex(product.id);

    if (existingItemIndex >= 0) {
      const updatedItems = [...currentItems];
      const existingItem = updatedItems[existingItemIndex];
      const newQuantity = existingItem.quantity + quantity;
      
      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: newQuantity,
        totalPrice: this.calculateItemPrice(product, newQuantity)
      };
      this.cartItems.set(updatedItems);
    } else {
      this.cartItems.set([
        ...currentItems,
        { 
          product, 
          quantity, 
          totalPrice: this.calculateItemPrice(product, quantity), 
          image: product.image 
        }
      ]);
    }
  }

  addItemById(productId: string | number, quantity: number = 1): void {
    const product = this.productHelper.getProductById(productId);
    if (product) {
      this.addItem(product, quantity);
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

    const itemIndex = this.findItemIndex(productId);
    if (itemIndex === -1) return;

    const updatedItems = [...this.cartItems()];
    const item = updatedItems[itemIndex];
    
    updatedItems[itemIndex] = {
      ...item,
      quantity,
      totalPrice: this.calculateItemPrice(item.product, quantity)
    };
    
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