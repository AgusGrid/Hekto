import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopCategories as TopCategoriesModel } from '@models/top-categories.model';
import topCategoriesData from './top-categories.json';
import { Card } from '@shared/components/card/card';

@Component({
  selector: 'app-top-categories',
  imports: [CommonModule, Card],
  templateUrl: './top-categories.html',
  styleUrl: './top-categories.scss',
})
export class TopCategories implements OnInit, OnDestroy {
  currentSlide = signal(0);
  private slideInterval?: number;
  topCategories = signal<TopCategoriesModel[]>(topCategoriesData);
  categoriesPerSlide = 4;

  // Calcular el número total de slides
  totalSlides = computed(() => {
    return Math.ceil(this.topCategories().length / this.categoriesPerSlide);
  });

  // Obtener las categorías del slide actual
  currentSlideCategories = computed(() => {
    const start = this.currentSlide() * this.categoriesPerSlide;
    const end = start + this.categoriesPerSlide;
    return this.topCategories().slice(start, end);
  });

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  startAutoSlide(): void {
    if (typeof window === 'undefined') {
      return;
    }
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
    const next = (this.currentSlide() + 1) % this.totalSlides();
    this.currentSlide.set(next);
  }

  prevSlide(): void {
    const prev = this.currentSlide() === 0 
      ? this.totalSlides() - 1 
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