import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-dropdown.html',
  styleUrl: './select-dropdown.scss',
})
export class SelectDropdown {
  @Input() options: SelectOption[] = [];
  @Input() selectedValue: string = '';
  @Input() placeholder: string = 'Selecciona una opción';
  @Output() selectionChange = new EventEmitter<string>();

  isOpen = false;

  get selectedLabel(): string {
    const selected = this.options.find(opt => opt.value === this.selectedValue);
    return selected ? selected.label : this.placeholder;
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: SelectOption): void {
    this.selectedValue = option.value;
    this.selectionChange.emit(option.value);
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.select-dropdown')) {
      this.isOpen = false;
    }
  }
}
