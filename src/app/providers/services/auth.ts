import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject, isDevMode, signal } from '@angular/core';
import { Observable, window } from 'rxjs';

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
  #http       = inject(HttpClient)
  #storageSvc = inject(StorageService)

  #auth_url = isDevMode() ? "http://localhost:8003/auth/" : AUTH_URL;
  #user_url = isDevMode() ? "http://localhost:8002/api/v1/user/" : USER_URL;

  #access_token = signal<string>(localStorage.getItem('access_token') || '')
  get access_token(): Signal<string> {
    const HOURS = 60 * 60 * 24;

    if (this.#access_token() !== '') {
      const payload = jwtDecode<JwtPayload>(this.#access_token())
      const now = new Date().getTime() / 1000;

      if (payload.exp - now < HOURS) {
        this.#http.get<AuthUser>(this.#auth_url, { withCredentials: true })
          .subscribe((auth) => {
            localStorage.setItem('access_token', auth.access_token)

            this.#access_token.set(auth.access_token)
          });
      }
    }

    return this.#access_token;
  }

  login(token: string): void {
    this.#http.post<AuthUser>(this.#auth_url + 'login', token, { withCredentials: true })
      .subscribe((auth) => {
        localStorage.setItem('access_token', auth.access_token)
        this.#access_token.set(auth.access_token)

        this.me(auth.access_token).subscribe(user => { this.#storageSvc.set('user', user) })
      });
  }

  logout(): void {
    // delete cookie
    this.#http.get(this.#auth_url + 'logout', { withCredentials: true }).subscribe();

    // clear access_token
    this.#access_token.set('')
    this.#storageSvc.remove('access_token')

    // clear localStorage
    this.#storageSvc.remove('user')

    // TODO: remove papers and others
  }

  private me(access_token: string): Observable<any> {
    let headers = {
      Authorization: 'Bearer ' + access_token,
      ContentType: 'application/json'}

    return this.#http.get<any>(this.#user_url + 'me/', { headers })
  }
}
