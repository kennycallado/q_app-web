import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject, isDevMode, signal } from '@angular/core';

import jwtDecode, { JwtPayload } from 'jwt-decode';

import { AUTH_URL } from '../constants';

import { StorageService } from './storage';
import { UserService } from './user';
// import { PaperService } from './papers_api';

type AuthUser = {
  user: string;
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #storageSvc = inject(StorageService)
  #userSvc    = inject(UserService)
  #http       = inject(HttpClient)

  #auth_url   = isDevMode() ? "http://localhost:8003/auth/" : AUTH_URL

  #access_token = signal<string>(localStorage.getItem('access_token') || '')
  get access_token(): Signal<string> {
    const HOURS = 60 * 60 * 12;

    if (this.#access_token() !== '') {
      const payload = jwtDecode<JwtPayload>(this.#access_token())
      const now = new Date().getTime() / 1000;

      if (payload.exp - now < HOURS) {
        this.#http.get<AuthUser>(this.#auth_url, { withCredentials: true })
          .subscribe((auth) => {
            localStorage.setItem('access_token', auth.access_token)

            this.#access_token.set(auth.access_token)
            this.#userSvc.me(this.#access_token())
          });

          // this.#userSvc.me(this.#access_token())
      }

      // update user to ensure the record is update
      // this make a lot of request to the server
      // this.#userSvc.me(this.#access_token())
    }

    return this.#access_token;
  }

  login(token: string): void {
    this.#http.post<AuthUser>(this.#auth_url + 'login', token, { withCredentials: true })
      .subscribe((auth) => {
        localStorage.setItem('access_token', auth.access_token)
        this.#access_token.set(auth.access_token)

        this.#userSvc.me(auth.access_token)
      });
  }

  logout(): void {
    // delete cookie
    this.#http.get(this.#auth_url + 'logout', { withCredentials: true }).subscribe();

    this.destroy()
    this.#userSvc.destroy()
    this.#storageSvc.destroy()
  }

  destroy() {
    this.#access_token.set('')
  }

  // private me(access_token: string): Observable<any> {
  //   let headers = {
  //     Authorization: 'Bearer ' + access_token,
  //     ContentType: 'application/json'}

  //   return this.#http.get<any>(this.#user_url + 'me/', { headers })
  // }
}
