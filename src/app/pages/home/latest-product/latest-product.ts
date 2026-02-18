import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { Card } from '@components/card/card';
import { CommonModule } from '@angular/common';
import latestProductJson from './latest-product.json';
import { LatestProductCategory, LatestProduct as LatestProductType } from '@models/latest-product.types';

@Component({
  selector: 'app-latest-product',
  imports: [CommonModule, Card],
  templateUrl: './latest-product.html',
  styleUrl: './latest-product.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // Optimización de rendimiento
})
export class LatestProduct {
  LatestProductCategory = LatestProductCategory;
  activeCategory = signal<LatestProductCategory>(LatestProductCategory.NEW_ARRIVAL);
  readonly products: { [key in LatestProductCategory]: LatestProductType[] } = latestProductJson;
  
  activeProducts = computed(() => {
    return this.products[this.activeCategory()] || [];
  });

  setActiveCategory(category: LatestProductCategory): void {
    this.activeCategory.set(category);
  }

  trackByProduct(index: number, product: LatestProductType): string {
    return product.image + product.title; 
  }
}