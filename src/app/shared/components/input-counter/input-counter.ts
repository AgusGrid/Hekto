import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-counter',
  standalone: true,
  imports: [],
  templateUrl: './input-counter.html',
  styleUrl: './input-counter.scss',
})
export class InputCounter {
  @Input() value: number = 1;
  @Output() valueChange = new EventEmitter<number>();

  increment(): void { 
    if (this.value < 100) {
      const newValue = this.value + 1;
      this.valueChange.emit(newValue);
    }
  }

  decrement(): void { 
    if (this.value > 0) {
      const newValue = this.value - 1;
      this.valueChange.emit(newValue);
    }
  }
}
