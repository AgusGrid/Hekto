import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@components/icon/icon.component';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, IconComponent],
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {

}
