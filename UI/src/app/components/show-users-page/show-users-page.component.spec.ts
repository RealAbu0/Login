import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUsersPageComponent } from './show-users-page.component';

describe('ShowUsersPageComponent', () => {
  let component: ShowUsersPageComponent;
  let fixture: ComponentFixture<ShowUsersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowUsersPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowUsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
