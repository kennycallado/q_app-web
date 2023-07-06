import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent {
  #authSvc = inject(AuthService)
  #router  = inject(Router)

  is_authenticated: boolean;
  update = effect(() => this.is_authenticated = this.#authSvc.access_token() !== '' )

  goToHome() {
    this.#router.navigate(['/home']);
  }

  goToAbout() {
    this.#router.navigate(['/about']);
  }

  goToModules() {
    this.#router.navigate(['/module']);
  }

  logout(): void {
    this.#authSvc.logout();
    this.#router.navigate(['/login']);

    return ;
  }
}
