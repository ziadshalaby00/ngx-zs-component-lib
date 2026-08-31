import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Field } from './field';

describe('Field', () => {
  let component: Field;
  let fixture: ComponentFixture<Field>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Field]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Field);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
