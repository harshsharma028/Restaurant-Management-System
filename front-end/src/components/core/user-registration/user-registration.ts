import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserAuth } from '../../../app/services/user-auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../app/services/notification';

@Component({
  selector: 'app-user-registration',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-registration.html',
  styleUrl: './user-registration.css',
})

export class UserRegistration {
  private userAuth = inject(UserAuth);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  signupForm: FormGroup;

  roles = ['Admin', 'Owner', 'Customer'];

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['Customer', Validators.required] // default value
    });
  }

  submitSignup() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    console.log('Signup Payload:', this.signupForm.value);

    const { userName, email, password, role } = this.signupForm.value;
    const payload = {
      name: userName || '',
      password: password || '',
      email: email || '',
      role: role.toLowerCase() || ''
    };
    this.userAuth.newUserRegistration(payload).subscribe({
      next: (response: any) => {
        console.log('response :>> ', response);
        this.router.navigate(['login']);
        this.notificationService.success(response.message);
      },
      error: (error: Error) => {
        this.notificationService.error(error.message);
        console.log('error :>> ', error);
        console.log('error.message :>> ', error.message);
      }
    });
  }
}
