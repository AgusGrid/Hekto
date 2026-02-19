import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Unique } from './unique';

describe('Unique', () => {
  let component: Unique;
  let fixture: ComponentFixture<Unique>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Unique]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Unique);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
