import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '@app/service/cart.service';
import { getProductById } from '@app/utils/product-mapper.util';
import { Product } from '@app/models/product-lister.model';

export type CardVariant = 'featured' | 'latest' | 'trending' | 
'top-category' | 'blog' | 'filter-grid' | 'filter-wide' ;

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() variant: CardVariant = 'featured';
  @Input() loading: boolean = false;
  @Input() image?: string;
  @Input() title?: string;
  @Input() description?: string;
  @Input() price?: string;
  @Input() code?: string;
  @Input() discountPrice?: string;
  @Input() sale?: boolean = false;
  @Input() date?: string;
  @Input() author?: string;
  @Input() rating?: number;
  @Input() productId?: string | number;
  @Input() product?: Product;

  @Output() viewDetails = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<void>();

  cartButtonAnimated = false;

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  onViewDetails(): void {
    if (this.productId) {
      this.router.navigate(['/products', this.productId]);
    }
    this.viewDetails.emit();
  }

  onAddToCart(): void {
    if (this.product) {
      this.cartService.addItem(this.product, 1);
    } 
    else if (this.productId) {
      const product = getProductById(this.productId);
      if (product) this.cartService.addItem(product, 1);
    }
    this.addToCart.emit();
    this.animateCartButton();
  }

  private animateCartButton(): void {
    this.cartButtonAnimated = true;
    setTimeout(() => {
      this.cartButtonAnimated = false;
    }, 600);
  }

}