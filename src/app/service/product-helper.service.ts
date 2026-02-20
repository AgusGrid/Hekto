import { Injectable } from '@angular/core';
import { Product } from '@app/models/product-lister.model';
import { getProductIdByTitleAndImage, getProductById } from '@app/utils/product-mapper.util';

export interface ProductWithId {
  title: string;
  image: string;
}

export interface ProductWithDirectId {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductHelperService {
  getProductId(product: ProductWithId): number | undefined {
    return getProductIdByTitleAndImage(product.title, product.image);
  }

  getProductForCard(product: ProductWithId): Product | undefined {
    const id = this.getProductId(product);
    return id ? getProductById(id) : undefined;
  }

  getProductById(id: number): Product | undefined {
    return getProductById(id);
  }

  getProductForCardGeneric<T extends ProductWithId | ProductWithDirectId>(
    product: T
  ): Product | undefined {
    if ('id' in product && typeof product.id === 'number') {
      return this.getProductById(product.id);
    }
    if ('title' in product && 'image' in product) {
      return this.getProductForCard(product as ProductWithId);
    }
    return undefined;
  }
}
