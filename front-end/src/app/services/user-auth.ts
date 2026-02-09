import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ENVIOMRNT_URL } from './api-const';

@Injectable({
  providedIn: 'root',
})
export class UserAuth {
  private httpClient = inject(HttpClient);

  private userLoginDetails = signal({
    user_name: "",
    user_id: "",
    user_role: "",
    user_email: "",
    user_token: ""
  });

  getUserId(): string {
    return this.userLoginDetails().user_id || '';
  }

  getUserName(): string {
    return this.userLoginDetails().user_name || '';
  }

  getUserAuthToken(): string {
    return this.userLoginDetails().user_token || '';
  }

  getUserRole(): string {
    return this.userLoginDetails().user_role || '';
  }

  userLogin(userAuthPayload: { email: string, password: string; }) {
    return this.httpClient.post(ENVIOMRNT_URL.API_DOMIN + '/auth/login', userAuthPayload);
  }

  newUserRegistration(userRegistrationPayload: { name: string; password: string; email: string; role: string; }) {
    return this.httpClient.post(ENVIOMRNT_URL.API_DOMIN + '/auth/register', userRegistrationPayload);
  };

  fetchAllRestautantList() {
    // return this.httpClient.post(ENVIOMRNT_URL.API_DOMIN + '')
  }

}
