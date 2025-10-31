import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxZsComponent } from './ngx-zs-component';

describe('NgxZsComponent', () => {
  let component: NgxZsComponent;
  let fixture: ComponentFixture<NgxZsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxZsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxZsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
