import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoAll } from './demo-all';

describe('DemoAll', () => {
  let component: DemoAll;
  let fixture: ComponentFixture<DemoAll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoAll]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoAll);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
