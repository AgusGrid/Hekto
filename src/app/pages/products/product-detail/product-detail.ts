import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@app/models/product-lister.model';
import productList from '../product-lister/product-lister.json';
import { IconComponent } from '@components/icon/icon.component';
import { CartService } from '@app/service/cart.service';
import { RouterModule } from '@angular/router';
import featuredProducts from '../../home/featured-products/featured-products.json';
import { FeaturedProduct } from '@models/featured-products.types';
import { ProductHelperService } from '@app/service/product-helper.service';
import { Card } from '@components/card/card'; 

@Component({    
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, IconComponent, RouterModule, Card],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cartService = inject(CartService);
  private productHelper = inject(ProductHelperService);

  private allProducts = signal<Product[]>(
    (productList as Product[]).map((product, index) => ({
      ...product,
      id: product.id || index + 1
    }))
  );

  productId = signal<string | null>(null);
  product = computed<Product | undefined>(() => {
    const id = this.productId();
    if (!id) return undefined;
    
    const idNum = Number(id);
    return this.allProducts().find(p => 
      p.id === idNum || p.id === id || 
      (p.id === undefined && Number(id) === this.allProducts().indexOf(p) + 1)
    );
  });

  alertMessage = signal<string | null>(null);
  showAlert = computed(() => this.alertMessage() !== null);

  activeTab = signal<'description' | 'additionalInfo' | 'reviews' | 'video'>('description');

  relatedProducts: FeaturedProduct[] = featuredProducts;
  hoveredProductId: number | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.productId.set(id);
      
      if (!this.product()) {
        this.router.navigate(['/products']);
      }
    });
  }

  getStars(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }

  addToCart(): void {
    const currentProduct = this.product();
    
    if (!currentProduct) {
      this.showAlertMessage('Error: Product not found');
      return;
    }

    this.cartService.addItem(currentProduct, 1);
    this.showAlertMessage(`${currentProduct.title} has been added to the cart`);
  }

  setActiveTab(tab: 'description' | 'additionalInfo' | 'reviews' | 'video'): void {
    this.activeTab.set(tab);
  }

  private showAlertMessage(message: string): void {
    this.alertMessage.set(message);
    setTimeout(() => {
      this.alertMessage.set(null);
    }, 3000);
  }

  formatPrice(price: number): string {
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  onCardHover(productId: number): void {
    this.hoveredProductId = productId;
  }

  onCardLeave(): void {
    this.hoveredProductId = null;
  }

  getProductForCard(product: FeaturedProduct) {
    return this.productHelper.getProductById(product.id);
  }
}
