import { Component, computed, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  imports: [ReactiveFormsModule],
  templateUrl: './signup-page.html',
  styleUrl: './signup-page.css',
})
export class SignupPage {
  private fb = new FormBuilder();

  signupForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  isFormValid = computed(() => this.signupForm.valid);

  submitCount = signal(0);

  onSubmit() {
    this.submitCount.update(v => v + 1);
    console.log('Signup Data:', this.signupForm.getRawValue());
  }
}
