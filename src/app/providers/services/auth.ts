import { HttpClient } from '@angular/common/http';
import { Injectable, Injector, Signal, effect, inject, isDevMode, signal } from '@angular/core';

import jwtDecode, { JwtPayload } from 'jwt-decode';

import { AUTH_URL } from '../constants';

import { UserService } from './user';
import { DestructorService } from './destructor';
import { PubUser } from '../models/user';

type AuthUser = {
  user: PubUser;
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #destrSvc   = inject(DestructorService)
  #injecot    = inject(Injector)
  #http       = inject(HttpClient)

  #auth_url   = isDevMode() ? "http://localhost:8003/auth/" : AUTH_URL
  // #auth_url   = "http://localhost:8003/auth/"

  update = effect(() => { localStorage.setItem('access_token', this.#access_token()) })
  #access_token = signal<string>(localStorage.getItem('access_token') || '')
  get access_token(): string {
    const HOURS = 60 * 60 * 12;

    if (this.#access_token() !== '') {
      const payload = jwtDecode<JwtPayload>(this.#access_token())
      const now = new Date().getTime() / 1000;

      if (payload.exp - now < HOURS) {
        this.#http.get<AuthUser>(this.#auth_url, { withCredentials: true })
          .subscribe((auth) => {
            // maybe move this outside the subscription
            const userSvc = this.#injecot.get(UserService)

            localStorage.setItem('access_token', auth.access_token)
            this.#access_token.set(auth.access_token)

            userSvc.me()
          });
      }
    }

    return this.#access_token();
  }

  login(token: string): void {
    this.#http.post<AuthUser>(this.#auth_url + 'login', token, { withCredentials: true })
      .subscribe((auth) => {
        const userSvc = this.#injecot.get(UserService)

        localStorage.setItem('access_token', auth.access_token)

        this.#access_token.set(auth.access_token)
        userSvc.me()
      });
  }

  logout(): void {
    // delete cookie
    this.#http.get(this.#auth_url + 'logout', { withCredentials: true }).subscribe();

    this.destroy()
    this.#destrSvc.destructor()
  }

  destroy() {
    this.#access_token.set('')
  }
}
