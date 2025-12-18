import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalError {
  handleError(message: string) {
    const error = new Error(message);

    const stack = error.stack || '';
    const stackLines = stack.split('\n');

    // Usually 2nd or 3rd line contains caller info
    const callerLine = stackLines[2] || stackLines[1] || '';

    console.error('🚨 Global Error Handler 🚨');
    console.error('Message:', message);
    console.error('Caller:', callerLine.trim());
    console.error('Full Stack:', stack);
    return throwError(message);
  }
}
