import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '@components/card/card';
import trendingProduct from './trending-product.json';
import { TrendingProduct as TrendingProductType } from '@models/trending-product.types';
import { getProductIdByTitleAndImage, getProductById } from '@app/utils/product-mapper.util';

@Component({
  selector: 'app-trending-product',
  imports: [CommonModule, Card],
  standalone: true,
  templateUrl: './trending-product.html',
  styleUrl: './trending-product.scss',
})
export class TrendingProduct {
  readonly trendingProduct = signal<TrendingProductType[]>(trendingProduct);

  getProductId(product: TrendingProductType): number | undefined {
    return getProductIdByTitleAndImage(product.title, product.image);
  }

  getProductForCard(product: TrendingProductType) {
    const id = this.getProductId(product);
    return id ? getProductById(id) : undefined;
  }
}