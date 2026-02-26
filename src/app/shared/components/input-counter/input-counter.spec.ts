import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCounter } from './input-counter';

describe('InputCounter', () => {
  let component: InputCounter;
  let fixture: ComponentFixture<InputCounter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputCounter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputCounter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
