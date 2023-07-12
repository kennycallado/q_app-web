import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, isDevMode, signal } from '@angular/core';

import { USER_URL } from '../constants';

import { StorageService } from './storage';
import { DestructorService } from './destructor';
import { AuthService } from './auth';
import { PubUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  #storageSvc = inject(StorageService)
  #destrSvc   = inject(DestructorService)
  #authSvc    = inject(AuthService)
  #http       = inject(HttpClient)

  #user_url   = isDevMode() ? "http://localhost:8002/api/v1/user/" : USER_URL

  #user       = signal<PubUser>(this.#storageSvc.get('user') as PubUser || new PubUser)
  user        = computed(() => this.#user())
  user_update = effect(() => { this.#storageSvc.set('user', this.#user()) })

  constructor() { this.#destrSvc.add(() => this.destructor()) }

  update_record(record: Record<string, number | string>) {
    this.#user.set({...this.#user(), project: {...this.#user().project, record: record}})
  }

  get_record() {
    this.me()

    return this.#user().project.record
  }

  me() {
    let url = this.#user().id ? this.#user_url + this.#user().id + '/' : this.#user_url + 'me/' ;

    let headers = {
      Authorization: 'Bearer ' + this.#authSvc.access_token,
      ContentType: 'application/json'}

    this.#http.get<PubUser>(url, { headers }).subscribe(res => this.#user.set(res))
  }

  destructor() {
    this.#user.set(new PubUser)
  }
}
