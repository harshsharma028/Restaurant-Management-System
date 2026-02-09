import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuth } from '../../../app/services/user-auth';
import { email } from '@angular/forms/signals';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-login.html',
  styleUrl: './user-login.css',
})


export class UserLogin {

  private userAuth = inject(UserAuth);
  private router = inject(Router);

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log('Login Form Value:', this.loginForm.value);

    // 👉 API call will go here

    const payload = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || ''
    };
    this.userAuth.userLogin(payload).subscribe({
      next: (response: any) => {
        this.router.navigate(['dashboard']);
      },
      error: (error: Error) => {
        console.log('error :>> ', error);
        console.log('error.message :>> ', error.message);
      }
    });
  }

}
