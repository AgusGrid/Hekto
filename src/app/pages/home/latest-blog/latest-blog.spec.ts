import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestBlog } from './latest-blog';

describe('LatestBlog', () => {
  let component: LatestBlog;
  let fixture: ComponentFixture<LatestBlog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestBlog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestBlog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
