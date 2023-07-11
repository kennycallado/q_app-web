import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DestructorService {
  #destructors: (() => void)[] = []

  add(destructor: () => void): void {
    this.#destructors.push(destructor)
  }

  destructor(): void {
    this.#destructors.forEach((destructor) => destructor())
  }

  clear(): void {
    this.#destructors = []
  }

  get length(): number {
    return this.#destructors.length
  }

  get destructors(): (() => void)[] {
    return this.#destructors
  }
}
