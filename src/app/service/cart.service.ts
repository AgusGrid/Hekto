import { Injectable, signal, computed } from '@angular/core';
import { CartItem, CartState } from '@app/models/cart-item.model';
import { Product } from '@app/models/product-lister.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);

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

  addItem(product: Product, quantity: number = 1): void {
    const currentItems = this.cartItems();
    const existingItemIndex = currentItems.findIndex(
      item => item.product.id === product.id
    );

    if (existingItemIndex >= 0) {
    // if the product already exists, update the quantity
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity
      };
      this.cartItems.set(updatedItems);
    } else {
      // if the product is new, add it to the cart
      this.cartItems.set([
        ...currentItems,
        { product, quantity }
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

    const updatedItems = this.cartItems().map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    );
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