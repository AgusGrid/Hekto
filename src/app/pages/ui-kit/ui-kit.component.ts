import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectDropdown, SelectOption } from '../../shared/components/select-dropdown/select-dropdown';
import { InputCounter } from '../../shared/components/input-counter/input-counter';
import { Card } from '../../shared/components/card/card';

interface CardData {
  variant: 'featured' | 'latest' | 'trending' | 'top-category' | 'blog' | 'filter-grid' | 'filter-wide';
  image?: string;
  title?: string;
  description?: string;
  price?: string;
  code?: string;
  discountPrice?: string;
  date?: string;
  author?: string;
  rating?: number;
}

@Component({
  selector: 'app-ui-kit',
  standalone: true,
  imports: [CommonModule, SelectDropdown, InputCounter, Card],
  templateUrl: './ui-kit.html',
  styleUrl: './ui-kit.scss',
})
export class UiKitComponent implements OnInit {
  sharedIcons = [
    'calendar', 'cart', 'check', 'chevron-down', 'heart', 'pen',
    'phone-call', 'search-tertiary', 'star', 'star-active', 'user',
    'view-grid', 'view-grid-active', 'view-list', 'view-list-active',
    'warning', 'zoom'
  ];

  socialIcons = ['facebook', 'instagram', 'pinterest', 'twitter'];

  selectOptions: SelectOption[] = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'higher', label: 'Price Higher' },
    { value: 'lower', label: 'Price Lower' }
  ];

  selectedValue = 'higher';

  // Propiedades para lazy loading demo
  isLoadingCards = true;
  loadedCards: CardData[] = [];

  onSelectionChange(value: string): void {
    this.selectedValue = value;
  }

  ngOnInit(): void {
    // Simular carga de datos con delay
    this.loadCardsWithDelay();
  }

  loadCardsWithDelay(): void {
    this.isLoadingCards = true;
    
    // Simular carga de datos después de 2 segundos
    setTimeout(() => {
      this.loadedCards = [
        {
          variant: 'featured',
          image: '/images/products/watches.jpg',
          title: 'Watches',
          code: 'Y523201',
          price: '$42.00'
        },
        {
          variant: 'blog',
          image: '/images/blog/1.jpg',
          title: 'Top essential Trends in 2023',
          date: '21 August, 2023',
          author: 'John Doe',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit hendrerit ex.'
        },
        {
          variant: 'filter-grid',
          image: '/images/products/headphones.jpg',
          title: 'Headphones',
          price: '$99.00',
          discountPrice: '$90.00',
          rating: 4,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
      ];
      this.isLoadingCards = false;
    }, 2000);
  }

  reloadCards(): void {
    this.loadCardsWithDelay();
  }
}
