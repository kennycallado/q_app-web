import { Component, OnInit, inject } from '@angular/core';
import { SwUpdate, VersionEvent } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  #swUpdate = inject(SwUpdate)
  title = 'q_app-web';

  ngOnInit() {
    if (this.#swUpdate.isEnabled) {
      this.#swUpdate.versionUpdates.subscribe((event: VersionEvent) => {
        if (event.type === 'VERSION_READY') {
          if(confirm("New version available. Load New Version?")) window.location.reload()
        }
      })

      // this.#swUpdate.checkForUpdate().then(() => {
      //   console.log('checked for update');
      // }).catch(err => {
      //   console.error('error when checking for update', err);
      // })

      // this.#swUpdate.available.subscribe(() => {
      //   if(confirm("New version available. Load New Version?")) {
      //     window.location.reload();
      //   }
      // });
    }
  }
}
