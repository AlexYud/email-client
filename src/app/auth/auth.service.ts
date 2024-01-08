import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

interface UsernameAvailableResponse {
  available: boolean
}

interface SignupCredentials {
  username: string | null;
  password: string | null;
  passwordConfirmation: string | null;
}

interface SignupResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedIn$ = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
  ) { }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(`${this.rootUrl}/auth/username`, {
      username,
    });
  }

  signup(credentials: Partial<SignupCredentials>) {
    return this.http.post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials, {
      withCredentials: true
    }).pipe(
      tap(() => this.signedIn$.next(true))
    );
  }

  checkAuth() {
    return this.http.get(`${this.rootUrl}/auth/signin`, { withCredentials: true });
  }
}
