import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountProduct, DiscountProductId } from '../../../models/discount-product.types';
import discount from './discount.json';

@Component({
  selector: 'app-discount',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './discount.html',
  styleUrl: './discount.scss',
})
export class Discount {
  readonly discountProducts: readonly DiscountProduct[] = discount as DiscountProduct[];
  readonly activeItem = signal<number>(DiscountProductId.HEADPHONES);
  
  readonly discountProduct = computed<DiscountProduct | undefined>(() => {
    return this.discountProducts.find(product => product.id === this.activeItem());
  });

  setActiveItem(id: number): void {
    this.activeItem.set(id);
  }
}