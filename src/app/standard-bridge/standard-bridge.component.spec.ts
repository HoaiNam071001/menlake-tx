import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardBridgeComponent } from './standard-bridge.component';

describe('StandardBridgeComponent', () => {
  let component: StandardBridgeComponent;
  let fixture: ComponentFixture<StandardBridgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardBridgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardBridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
