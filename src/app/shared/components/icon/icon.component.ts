import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subject, takeUntil, Observable, shareReplay } from 'rxjs';

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
  
  private static svgCache = new Map<string, string>();
  private static loadingPromises = new Map<string, Observable<string>>();
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
    if (changes['name'] || changes['size'] || changes['folder']) {
      this.loadIcon();
    }

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

    const cacheKey = `${this.folder}_${this.name}`;

    if (IconComponent.svgCache.has(cacheKey)) {
      const cachedSvg = IconComponent.svgCache.get(cacheKey)!;
      this.processSvg(cachedSvg);
      return;
    }

    if (IconComponent.loadingPromises.has(cacheKey)) {
      IconComponent.loadingPromises.get(cacheKey)!
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (svg) => {
            this.processSvg(svg);
          },
          error: (error) => {
            console.error(`Icon ${this.name} not found:`, error);
          }
        });
      return;
    }

    const iconPath = `/icons/${this.folder}/${this.name}.svg`;
    const request$ = this.http.get(iconPath, { responseType: 'text' }).pipe(
      shareReplay(1),
      takeUntil(this.destroy$)
    );

    IconComponent.loadingPromises.set(cacheKey, request$);

    request$.subscribe({
      next: (svg) => {
        IconComponent.svgCache.set(cacheKey, svg);
        IconComponent.loadingPromises.delete(cacheKey);
        this.processSvg(svg);
      },
      error: (error) => {
        console.error(`Icon ${this.name} not found:`, error);
        IconComponent.loadingPromises.delete(cacheKey);
      }
    });
  }

  private processSvg(svg: string) {
    let processedSvg = svg
      .replace(/fill="[^"]*"/g, 'fill="currentColor"')
      .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
      .replace(/width="[^"]*"/g, `width="${this.size}"`)
      .replace(/height="[^"]*"/g, `height="${this.size}"`);

    this.svgContent = this.sanitizer.bypassSecurityTrustHtml(processedSvg);
  }
}