import { Component, inject } from '@angular/core';
import { PaperService } from 'src/app/providers/services/papers_api';
import { UserService } from 'src/app/providers/services/user';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.sass']
})
export class ModulesComponent {
  #paperSvc = inject(PaperService)
  #userSvc  = inject(UserService)

  papers = this.#paperSvc.papers

  ngAfterViewInit() {
    this.#paperSvc.initPapers()
  }

  refresh_papers() {
    this.#paperSvc.initPapers()
  }

  refresh_record() {
    this.#userSvc.me()
  }
}
