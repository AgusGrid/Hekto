import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestProduct } from './latest-products';

describe('LatestProduct', () => {
  let component: LatestProduct;
  let fixture: ComponentFixture<LatestProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
