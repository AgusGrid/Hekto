import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@app/models/product-lister.model';
import productList from '../product-lister/product-lister.json';
import { IconComponent } from '@components/icon/icon.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetailComponent implements OnInit {
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

  quantity = signal<number>(1);

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.productId.set(id);
      
      if (!this.product()) {
        // Si el producto no se encuentra, redirigir a la lista
        this.router.navigate(['/products']);
      }
    });
  }

  increaseQuantity(): void {
    this.quantity.set(this.quantity() + 1);
  }

  decreaseQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.set(this.quantity() - 1);
    }
  }

  getStars(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }

  addToCart(): void {
    // TODO: Implementar lógica de agregar al carrito
    console.log('Agregar al carrito:', this.product(), 'Cantidad:', this.quantity());
  }

  addToWishlist(): void {
    // TODO: Implementar lógica de agregar a wishlist
    console.log('Agregar a wishlist:', this.product());
  }

  goBackToProducts(): void {
    this.router.navigate(['/products']);
  }
}
