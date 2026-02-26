import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: '<span [innerHTML]="svgContent" [class]="iconClass" [style.color]="color"></span>',
  styles: [`
    .icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: inherit;
    }
    
    .icon svg {
      display: block;
    }
  `]
})
export class IconComponent implements OnInit, OnChanges, OnDestroy {
  @Input() name!: string;
  @Input() size: string = '14';
  @Input() color?: string;
  @Input() class?: string;
  @Input() folder: string = 'shared';

  svgContent: SafeHtml = '';
  iconClass = 'icon';
  
  // cache the svg icons to avoid multiple requests
  private static cache = new Map<string, string>();
  // destroy the subscription to avoid memory leaks
  private destroy$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadIcon();
    if (this.class) this.iconClass += ` ${this.class}`;

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['name'] || changes['size'] || changes['folder']) this.loadIcon();

    if (changes['class']) {
      this.iconClass = 'icon';
      if (this.class) this.iconClass += ` ${this.class}`;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadIcon() {
    if (!this.name) return;

    const cacheKey = `${this.folder}_${this.name}_${this.size}`;

    if (IconComponent.cache.has(cacheKey)) {
      const cachedSvg = IconComponent.cache.get(cacheKey)!;
      this.processSvg(cachedSvg);
      return;
    }

    const iconPath = `/icons/${this.folder}/${this.name}.svg`;
    this.http.get(iconPath, { responseType: 'text' })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (svg) => {
          IconComponent.cache.set(cacheKey, svg);
          this.processSvg(svg);
        },
        error: (error) => {
          console.error(`Icon ${this.name} not found:`, error);
        }
      });
  }

  private processSvg(svg: string) {
    let processedSvg = svg
      .replace(/fill="[^"]*"/g, 'fill="currentColor"')
      .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
      .replace(/width="[^"]*"/g, `width="${this.size}"`)
      .replace(/height="[^"]*"/g, `height="${this.size}"`);

    // Angular blocks the svg by default to avoid XSS attacks
    // so we need to bypass security trust html to avoid XSS attacks
    this.svgContent = this.sanitizer.bypassSecurityTrustHtml(processedSvg);
  }
}