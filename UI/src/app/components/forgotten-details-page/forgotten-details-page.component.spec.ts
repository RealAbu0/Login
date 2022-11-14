import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgottenDetailsPageComponent } from './forgotten-details-page.component';

describe('ForgottenDetailsPageComponent', () => {
  let component: ForgottenDetailsPageComponent;
  let fixture: ComponentFixture<ForgottenDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgottenDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgottenDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
