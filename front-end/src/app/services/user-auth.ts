import { inject, Injectable, signal } from '@angular/core';
import { GlobalError } from '../core/error/global-error';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

interface userAuthDetailsInterface {
  user_name: string;
  user_email: string;
  user_role: string;
  user_id: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserAuth {
  private errorLogger = inject(GlobalError);
  private httpClient = inject(HttpClient);
  private domainName = "http://localhost:5000/";

  userLoginDetails = signal<userAuthDetailsInterface>({
    user_name: '',
    user_email: '',
    user_role: '',
    user_id: '',
    token: ''
  });

  setUserAuthDetails(userDetailsObj: userAuthDetailsInterface) {
    this.userLoginDetails.set(userDetailsObj);
  }

  userAuthLogin(payload: { email: string; password: string; }) {
    try {
      return this.httpClient.post(this.domainName + 'auth/login', payload)
        .pipe(catchError(error => { return this.errorLogger.handleError(error.message); }));
    } catch (error: any) {
      return this.errorLogger.handleError(error.message);
    }
  }

}
