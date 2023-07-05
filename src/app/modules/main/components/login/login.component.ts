import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  #authSvc = inject(AuthService)
  #router  = inject(Router)

  submit(user_token: HTMLInputElement) {
    this.#authSvc.login(user_token.value)

    // TODO: arreglar...
    setTimeout(() => {
      this.#router.navigate(['home']);
    }, 1000)
  }
}
