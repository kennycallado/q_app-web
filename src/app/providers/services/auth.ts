import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, computed, isDevMode, signal } from '@angular/core';
import { Observable } from 'rxjs';

import jwtDecode, { JwtPayload } from 'jwt-decode';

import { AUTH_URL, USER_URL } from '../constants';

import { StorageService } from './storage';

type AuthUser = {
  user: string;
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #auth_api = AUTH_URL;
  #user_api = USER_URL;
  #access_token = signal('')

  constructor(
    private http: HttpClient,
    private storageSvc: StorageService) {
    if (isDevMode()) {
      this.#auth_api = "http://localhost:8003/auth/";
      this.#user_api = "http://localhost:8002/api/v1/user/";
    }
  }

  get access_token(): Signal<string> {
    const HOURS = 60 * 60 * 24;
    const access_token = window.localStorage.getItem("access_token") || '';

    if (access_token) {
      const payload = jwtDecode<JwtPayload>(access_token)
      const now = new Date().getTime() / 1000;

      if (payload.exp - now < HOURS) {
        this.http.get<AuthUser>(this.#auth_api, { withCredentials: true })
          .subscribe((auth) => {
            window.localStorage.setItem('access_token', auth.access_token)

            this.#access_token.set(auth.access_token)
          });
      }
    }

    return this.#access_token;
  }

  login(token: string): void {
    this.http.post<AuthUser>(this.#auth_api + 'login', token, { withCredentials: true })
      .subscribe((auth) => {
        window.localStorage.setItem('access_token', auth.access_token)

        this.me(auth.access_token).subscribe(user => {
          this.storageSvc.set('user', user)

          // should be here to save user first
          // otherwise, papers will not be loaded
          this.#access_token.set(auth.access_token)
        })
      });
  }

  logout(): void {
    this.http.get(this.#auth_api + 'logout', { withCredentials: true })
      .subscribe(() => {
        this.storageSvc.remove('access_token')
        this.storageSvc.remove('user')
        this.#access_token.set('')

        // TODO: remove papers and others
        // from localStorage and clear signals
      });
  }

  private me(access_token: string): Observable<any> {
    let headers = {
      Authorization: 'Bearer ' + access_token,
      ContentType: 'application/json'}

    return this.http.get<any>(this.#user_api + 'me/', { headers })
  }
}
