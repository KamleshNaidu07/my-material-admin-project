import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        providers: [AuthService],
        imports: [ReactiveFormsModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have a login form', () => {
    const form = fixture.nativeElement.querySelector('form');
    expect(form).toBeTruthy();
  });

  it('should have username and password inputs', () => {
    const usernameInput = fixture.nativeElement.querySelector('input[formControlName="username"]');
    const passwordInput = fixture.nativeElement.querySelector('input[formControlName="password"]');
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should have a login button', () => {
    const loginButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(loginButton).toBeTruthy();
  });

  it('should call onSubmit when the form is submitted with valid data', () => {
    spyOn(component, 'onSubmit');
    const form = component.loginForm;
    form.setValue({ username: 'valid-username', password: 'valid-password' });
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should not call onSubmit when the form is submitted with invalid data', () => {
    spyOn(component, 'onSubmit');
    const form = component.loginForm;
    // Form is not valid (empty fields)
    form.setValue({ username: '', password: '' });
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();
    expect(component.onSubmit).not.toHaveBeenCalled();
  });

  it('should navigate to /dashboard when login is successful', () => {
    spyOn(authService, 'login').and.returnValue(true); // Simulate successful login
    spyOn(router, 'navigate');
    component.onSubmit();
    expect(authService.login).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should display an error message when login fails', () => {
    spyOn(authService, 'login').and.returnValue(false); // Simulate login failure
    spyOn(window, 'alert');
    component.onSubmit();
    expect(authService.login).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Login failed');
  });
});
