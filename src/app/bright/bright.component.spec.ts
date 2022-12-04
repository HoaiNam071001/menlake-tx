import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrightComponent } from './bright.component';

describe('BrightComponent', () => {
  let component: BrightComponent;
  let fixture: ComponentFixture<BrightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
