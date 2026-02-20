import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  @Output() viewDetails = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<void>();

  constructor(private router: Router) {}

  onViewDetails(): void {
    if (this.productId) {
      this.router.navigate(['/products', this.productId]);
    }
    this.viewDetails.emit();
  }

  onAddToCart(): void {
    this.addToCart.emit();
  }

}