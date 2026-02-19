import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@components/icon/icon.component';
import { Card } from '@components/card/card';
import productList from './product-lister.json';
import { Product } from '@app/models/product-lister.model';

@Component({
  selector: 'app-product-lister',
  standalone: true,
  imports: [CommonModule, IconComponent, Card],
  templateUrl: './product-lister.html',
  styleUrl: './product-lister.scss',
})
export class ProductListerComponent {
  readonly products = signal<Product[]>(productList as Product[]); 

  trackByProduct(index: number, product: Product): string {
    return product.image + product.title;
  } 

  activeBrand = signal<string>('');
  activeDiscount = signal<string>('');
  activeRating = signal<string>('');
  activeCategories = signal<string>('');
  activePrice = signal<string>('');

  perPage = signal<number>(10);
  sortBy = signal<string>('price-asc');
  view = signal<string>('grid');

  setView(viewType: string): void {
    this.view.set(viewType);
  }

  onPerPageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.perPage.set(Number(target.value));
  }

  onSortByChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortBy.set(target.value);
  }

  onBrandChange(brand: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      document.querySelectorAll('input[name^="product-brand"]').forEach((checkbox: any) => {
        if (checkbox !== target) checkbox.checked = false;
      });
      this.activeBrand.set(brand);
    } else {
      this.activeBrand.set('');
    }
  }

  onDiscountChange(discount: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      document.querySelectorAll('input[name^="discount-offer"]').forEach((checkbox: any) => {
        if (checkbox !== target) checkbox.checked = false;
      });
      this.activeDiscount.set(discount);
    } else {
      this.activeDiscount.set('');
    }
  }

  onRatingChange(rating: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      document.querySelectorAll('input[name^="rating"]').forEach((checkbox: any) => {
        if (checkbox !== target) checkbox.checked = false;
      });
      this.activeRating.set(rating);
    } else {
      this.activeRating.set('');
    }
  }

  onCategoryChange(category: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      document.querySelectorAll('input[name^="categories"]').forEach((checkbox: any) => {
        if (checkbox !== target) checkbox.checked = false;
      });
      this.activeCategories.set(category);
    } else {
      this.activeCategories.set('');
    }
  }

  onPriceChange(priceRange: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      document.querySelectorAll('input[name^="price"]').forEach((checkbox: any) => {
        if (checkbox !== target) checkbox.checked = false;
      });
      this.activePrice.set(priceRange);
    } else {
      this.activePrice.set('');
    }
  }

  computedProducts = computed(() => {
    let products = [...this.products()];
    
    if (this.activeCategories()) {
      products = products.filter(product => product.category === this.activeCategories());
    }

    if (this.activeBrand()) {
      products = products.filter(product => product.brand === this.activeBrand());
    }

    if (this.activeDiscount()) {
      if (this.activeDiscount() === '20% Cashback') {
        products = products.filter(product => product.cashback === '20% Cashback');
      } else if (this.activeDiscount() === '5% Cashback Offer') {
        products = products.filter(product => product.cashback === '5% Cashback Offer');
      } else if (this.activeDiscount() === '25% Discount Offer') {
        products = products.filter(product => product.discountOffer === '25% Discount Offer');
      }
    }

    if (this.activeRating()) {
      products = products.filter(product => product.rating === Number(this.activeRating()));
    }

    if (this.activePrice()) {
      const priceRange = this.activePrice();
      products = products.filter(product => {
        const price = parseFloat(product.discountPrice.replace('$', ''));
        if (priceRange === '$0 - $150') {
          return price >= 0 && price <= 150;
        } else if (priceRange === '$150 - $350') {
          return price >= 150 && price <= 350;
        } else if (priceRange === '$350 - $500') {
          return price >= 350 && price <= 500;
        } else if (priceRange === '$550 - $800') {
          return price >= 550 && price <= 800;
        } else if (priceRange === '$800+') {
          return price >= 800;
        }
        return true;
      });
    }

    if (this.sortBy() === 'price-asc') {
      products.sort((a, b) => {
        const priceA = parseFloat(a.discountPrice.replace('$', ''));
        const priceB = parseFloat(b.discountPrice.replace('$', ''));
        return priceA - priceB;
      });
    } else if (this.sortBy() === 'price-desc') {
      products.sort((a, b) => {
        const priceA = parseFloat(a.discountPrice.replace('$', ''));
        const priceB = parseFloat(b.discountPrice.replace('$', ''));
        return priceB - priceA;
      });
    }

    return products.slice(0, this.perPage());
  });
}