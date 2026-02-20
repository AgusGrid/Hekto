import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@app/models/product-lister.model';
import productList from '../product-lister/product-lister.json';
import { IconComponent } from '@components/icon/icon.component';
import { CartService } from '@app/service/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cartService = inject(CartService);

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

  private showAlertMessage(message: string): void {
    this.alertMessage.set(message);
    setTimeout(() => {
      this.alertMessage.set(null);
    }, 3000);
  }
}
