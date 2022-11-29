import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TxTableComponent } from './tx-table.component';

describe('TxTableComponent', () => {
  let component: TxTableComponent;
  let fixture: ComponentFixture<TxTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TxTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TxTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
