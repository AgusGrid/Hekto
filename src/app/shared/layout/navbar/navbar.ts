import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '@components/icon/icon.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  menuItems = [
    { label: 'Home', path: '/', enabled: true },
    { label: 'Products', path: '/products', enabled: true },
    { label: 'Blog', path: '/blog', enabled: false },
    { label: 'Contact', path: '/contact', enabled: false }
  ];
}