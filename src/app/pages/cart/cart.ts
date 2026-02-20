import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '@app/service/cart.service';
import { InputCounter } from '@components/input-counter/input-counter';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, InputCounter],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class CartComponent {
  readonly cartService = inject(CartService);
  readonly cartState = this.cartService.cartState;

  readonly hasItems = computed(() => this.cartState().items.length > 0);

  onQuantityChange(productId: string | number | undefined, quantity: number): void {
    if (productId !== undefined && productId !== null) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  onRemoveItem(productId: string | number | undefined): void {
    if (productId !== undefined && productId !== null) {
      this.cartService.removeItem(productId);
    }
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }
}