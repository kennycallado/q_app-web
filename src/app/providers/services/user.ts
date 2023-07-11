import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, isDevMode, signal } from '@angular/core';

import { USER_URL } from '../constants';

import { StorageService } from './storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  #storageSvc = inject(StorageService)
  #http       = inject(HttpClient)

  #user_url   = isDevMode() ? "http://localhost:8002/api/v1/user/" : USER_URL

  #user       = signal<any>(this.#storageSvc.get('user') || {})
  user        = computed(() => this.#user())
  user_update = effect(() => { this.#storageSvc.set('user', this.#user()) })

  update_record(record: string) {
    this.#user.update((user) => { user.project.record = record })
  }

  me(access_token: string) {
    let headers = {
      Authorization: 'Bearer ' + access_token,
      ContentType: 'application/json'}

    this.#http.get<any>(this.#user_url + 'me/', { headers }).subscribe(res => this.#user.set(res))
  }

  destroy() {
    this.#user.set({})
    this.user_update.destroy()
  }
}
