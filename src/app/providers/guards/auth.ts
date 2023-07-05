import { Injectable, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  #authSvc = inject(AuthService)
  #router  = inject(Router)

  is_authenticated: boolean = this.#authSvc.access_token() !== ''
  update = effect(() => this.is_authenticated = this.#authSvc.access_token() !== '' )

  canActivate(): boolean {
    if (!this.is_authenticated) {
      this.#router.navigate(['login']);
    }

    return this.is_authenticated;
  }
}
