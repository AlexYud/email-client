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

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

interface SigninCredentials {
  username: string | null;
  password: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedIn$ = new BehaviorSubject<boolean | null>(null);

  constructor(
    private http: HttpClient,
  ) { }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(`${this.rootUrl}/auth/username/`, {
      username,
    });
  }

  signup(credentials: Partial<SignupCredentials>) {
    return this.http.post<SignupResponse>(`${this.rootUrl}/auth/signup/`, credentials).pipe(
      tap(() => this.signedIn$.next(true))
    );
  }

  checkAuth() {
    return this.http.get<SignedinResponse>(`${this.rootUrl}/auth/signedin/`).pipe(
      tap(({ authenticated }) => this.signedIn$.next(authenticated))
    );
  }

  signout() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {}).pipe(
      tap(() => this.signedIn$.next(null))
    );
  }

  signin(credentials: Partial<SigninCredentials>) {
    return this.http.post(`${this.rootUrl}/auth/signin/`, credentials).pipe(
      tap(() => this.signedIn$.next(true))
    );
  }
}
