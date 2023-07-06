import { Component, Signal, inject } from '@angular/core';
import { PubPaper } from 'src/app/providers/models/paper';
import { PaperService } from 'src/app/providers/services/papers_api';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.sass']
})
export class ModulesComponent {
  #paperSvc = inject(PaperService)

  papers: Signal<PubPaper[]> = this.#paperSvc.papers;

  resourceType(paper: PubPaper) {
    return Object.keys(paper.resource.content)[0]
  }

  showPapers() {
    console.log(this.papers())
  }

  refresh() {
    this.#paperSvc.refresh()
  }
}
