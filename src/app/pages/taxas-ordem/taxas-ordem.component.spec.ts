import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxasOrdemComponent } from './taxas-ordem.component';

describe('TaxasOrdemComponent', () => {
  let component: TaxasOrdemComponent;
  let fixture: ComponentFixture<TaxasOrdemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxasOrdemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxasOrdemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
