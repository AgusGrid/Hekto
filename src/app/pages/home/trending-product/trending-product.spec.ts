import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingProduct } from './trending-product';

describe('TrendingProduct', () => {
  let component: TrendingProduct;
  let fixture: ComponentFixture<TrendingProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendingProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
