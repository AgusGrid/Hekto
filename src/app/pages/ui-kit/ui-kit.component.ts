import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectDropdown, SelectOption } from '../../shared/components/select-dropdown/select-dropdown';
import { InputCounter } from '../../shared/components/input-counter/input-counter';
import { Card } from '../../shared/components/card/card';

@Component({
  selector: 'app-ui-kit',
  standalone: true,
  imports: [CommonModule, SelectDropdown, InputCounter, Card],
  templateUrl: './ui-kit.html',
  styleUrl: './ui-kit.scss',
})
export class UiKitComponent {
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

  onSelectionChange(value: string): void {
    this.selectedValue = value;
  }
}
