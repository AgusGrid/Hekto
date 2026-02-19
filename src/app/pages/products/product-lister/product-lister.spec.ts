import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListerComponent } from './product-lister';

describe('ProductLister', () => {
  let component: ProductListerComponent;
  let fixture: ComponentFixture<ProductListerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListerComponent); 
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
