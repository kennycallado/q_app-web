import { Injectable, inject } from "@angular/core";
// import { DestructorService } from "./destructor";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // #destrSvc = inject(DestructorService)

  constructor() { /* this.#destrSvc.add(() => this.clear()) */ }

  set(key: string, value: any): void {
    if (key === 'access_token') throw new Error('Use AuthService instead');

    window.localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    if (key === 'access_token') throw new Error('Use AuthService instead');

    return JSON.parse(window.localStorage.getItem(key)) || undefined;
  }

  remove(key: string): void {
    window.localStorage.removeItem(key);
  }

  clear(): void {
    window.localStorage.clear();
  }
}
