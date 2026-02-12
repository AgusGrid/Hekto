import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  @Input() image?: string;
  @Input() title?: string;
  @Input() description?: string;
  @Input() price?: string;
  @Input() code?: string;
  @Input() discountPrice?: string;
  @Input() date?: string;
  @Input() author?: string;
  @Input() rating?: number;
}