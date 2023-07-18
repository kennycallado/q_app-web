import { Component, inject } from '@angular/core';
import { UserService } from 'src/app/providers/services/user';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent {
  #userSvc = inject(UserService)

  user = this.#userSvc.user

  getMood() {
    if (!this.user()) return '🙃';

    return this.user().project.record.mood || '🙆'
  }
}
