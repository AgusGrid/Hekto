import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { Card } from '@components/card/card';
import { CommonModule } from '@angular/common';
import latestProductJson from './latest-products.json';
import { LatestProductCategory, LatestProduct as LatestProductType } from '@models/latest-product.types';
import { ProductHelperService } from '@app/service/product-helper.service';

@Component({
  selector: 'app-latest-products',
  standalone: true,
  imports: [CommonModule, Card],
  templateUrl: './latest-products.html',
  styleUrl: './latest-products.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, 
})
export class LatestProducts {
  LatestProductCategory = LatestProductCategory;
  activeCategory = signal<LatestProductCategory>(LatestProductCategory.NEW_ARRIVAL);
  readonly products: { [key in LatestProductCategory]: LatestProductType[] } = latestProductJson;
  
  activeProducts = computed(() => {
    return this.products[this.activeCategory()] || [];
  });

  constructor(private productHelper: ProductHelperService) {}

  setActiveCategory(category: LatestProductCategory): void {
    this.activeCategory.set(category);
  }

  trackByProduct(index: number, product: LatestProductType): string {
    return product.image + product.title; 
  }

  getProductId(product: LatestProductType): number | undefined {
    return this.productHelper.getProductId(product);
  }

  getProductForCard(product: LatestProductType) {
    return this.productHelper.getProductForCard(product);
  }
}