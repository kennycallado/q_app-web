import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  #authSvc = inject(AuthService)
  #router  = inject(Router)
  #route   = inject(ActivatedRoute)

  update = effect(() => {
    if (this.#authSvc.access_token() !== '') {
      const returnUrl = this.#route.snapshot.queryParams['returnUrl'] || '/home';
      this.#router.navigateByUrl(returnUrl);
    }
  })

  submit(user_token: HTMLInputElement) {
    this.#authSvc.login(user_token.value)
  }
}
