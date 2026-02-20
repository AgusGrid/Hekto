import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '@components/card/card';
import trendingProduct from './trending-product.json';
import { TrendingProduct as TrendingProductType } from '@models/trending-product.types';
import { ProductHelperService } from '@app/service/product-helper.service';

@Component({
  selector: 'app-trending-product',
  imports: [CommonModule, Card],
  standalone: true,
  templateUrl: './trending-product.html',
  styleUrl: './trending-product.scss',
})
export class TrendingProduct {
  readonly trendingProduct = signal<TrendingProductType[]>(trendingProduct);

  constructor(private productHelper: ProductHelperService) {}

  getProductId(product: TrendingProductType): number | undefined {
    return this.productHelper.getProductId(product);
  }

  getProductForCard(product: TrendingProductType) {
    return this.productHelper.getProductForCard(product);
  }
}