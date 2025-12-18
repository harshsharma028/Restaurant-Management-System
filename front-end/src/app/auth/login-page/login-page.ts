import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserAuth } from '../../services/user-auth';
import { NotificationService } from '../../core/services/notification';

interface responseInterFace {
  status: string;
  data: object;
  message: string;
  messageCode: string;
};

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {

  private userAuth = inject(UserAuth);
  private notificationService = inject(NotificationService);

  loginData = signal({
    email: '',
    password: ''
  });



  onSubmit() {
    console.log('Login Data:', this.loginData);
    const user_login_payload = {
      email: this.loginData().email,
      password: this.loginData().password,
    };

    this.userAuth.userAuthLogin(user_login_payload).subscribe((response: any) => {
      if (response && response.status) {
        this.notificationService.warn("Login Successfully!!");
      } else {
        this.notificationService.warn("Not Valid");
      }
    }, (error) => {
      this.notificationService.warn("Not Valid");
    });

  }
}
