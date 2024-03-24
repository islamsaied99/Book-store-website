import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from '../../Services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  loginForm: FormGroup;
  signupForm: FormGroup;
  showPassword: boolean = false;
  currentForm: 'login' | 'signup' = 'login';

  constructor(private fire_auth :AuthService,private renderer: Renderer2, private fb: FormBuilder,private rout:Router,private ViewportScroller: ViewportScroller) {
    this.ViewportScroller.scrollToPosition([0, 0]);
    this.loginForm = this.fb.group({
      loginEmail: [''],
      loginPassword: [''],
    });

    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      signupEmail: ['', [Validators.required, Validators.email]],
      signupPassword: [
        '',
        [Validators.required, Validators.minLength(5), this.passwordValidator],
      ],
    });
  }

  passwordValidator(control: AbstractControl) {
    if (control.value) {
      const hasUpperCase = /[A-Z]/.test(control.value);
      const hasLowerCase = /[a-z]/.test(control.value);

      const valid = hasUpperCase && hasLowerCase;

      return valid ? null : { invalidPassword: true };
    }

    return null;
  }

  //show password func
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;

    const passwordInput = this.passwordInput.nativeElement;

    if (this.showPassword) {
      this.renderer.setProperty(passwordInput, 'type', 'text');
    } else {
      this.renderer.setProperty(passwordInput, 'type', 'password');
    }
  }

  submitLoginForm() {
    const email = this.loginForm.get('loginEmail')?.value;
    const password = this.loginForm.get('loginPassword')?.value;

    this.fire_auth.login(email, password);
  }

  submitSignUpForm() {
    if (this.signupForm.valid) {
      const firstName = this.signupForm.get('firstName')?.value;
      const lastName = this.signupForm.get('lastName')?.value;
      const email = this.signupForm.get('signupEmail')?.value;
      const password = this.signupForm.get('signupPassword')?.value;
      this.fire_auth.signUp(email, password, firstName, lastName);
      this.rout.navigate(['login']);
      alert('SignUp Successfuly ❤️');
    }
  }
}
