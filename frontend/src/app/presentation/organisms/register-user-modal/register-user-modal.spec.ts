import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserModal } from './register-user-modal';

describe('RegisterUserModal', () => {
  let component: RegisterUserModal;
  let fixture: ComponentFixture<RegisterUserModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterUserModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterUserModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
