import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserAuth } from './user-auth';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userAuth = inject(UserAuth);
  const user_token = userAuth.getUserAuthToken();

  if (!user_token) return next(req);

  const updatedAuthHeader = req.clone({
    setHeaders: {
      Authorization: user_token
    }
  });
  return next(updatedAuthHeader);
};
