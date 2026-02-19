import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSlide } from '@models/hero-slide.model';
import slidesData from './home.slides.json';
import { FeaturedProducts } from './featured-products/featured-products';


@Component({
  selector: 'app-home',
  imports: [CommonModule, FeaturedProducts],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  currentSlide = signal(0);
  private slideInterval?: number;
  slides: HeroSlide[] = slidesData;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  startAutoSlide(): void {
    this.slideInterval = window.setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoSlide(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = undefined;
    }
  }

  nextSlide(): void {
    const next = (this.currentSlide() + 1) % this.slides.length;
    this.currentSlide.set(next);
  }

  prevSlide(): void {
    const prev = this.currentSlide() === 0 
      ? this.slides.length - 1 
      : this.currentSlide() - 1;
    this.currentSlide.set(prev);
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  isActiveSlide(index: number): boolean {
    return this.currentSlide() === index;
  }
}