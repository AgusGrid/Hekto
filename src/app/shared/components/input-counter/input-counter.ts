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
    this.value < 100 && this.value++;
    this.valueChange.emit(this.value);
  }

  decrement(): void { 
    this.value > 1 && this.value--;
    this.valueChange.emit(this.value);
  }
}
