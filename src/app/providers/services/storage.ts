import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

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
