import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import featuredProducts from './featured-products.json';
import { FeaturedProduct } from '@models/featured-products.types';
import { Card } from '@components/card/card';

@Component({
  selector: 'app-featured-products',
  imports: [Card, CommonModule],
  templateUrl: './featured-products.html',
  styleUrl: './featured-products.scss',
})
export class FeaturedProducts {
  featuredProducts: FeaturedProduct[] = featuredProducts;
  hoveredProductId: number | null = null;

  formatPrice(price: number): string {
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  onCardHover(productId: number): void {
    this.hoveredProductId = productId;
  }

  onCardLeave(): void {
    this.hoveredProductId = null;
  }
}
