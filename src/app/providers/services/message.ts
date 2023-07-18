import { Injectable, computed, effect, inject, signal } from "@angular/core";

import { Message } from "../models/message";
import { StorageService } from "./storage";
import { DestructorService } from "./destructor";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  #storageSvc = inject(StorageService)
  #destrSvc   = inject(DestructorService)

  #messages   = signal<Message[]>(this.#storageSvc.get('messages') as Message[] || [] as Message[]);
  messages    = computed(() => this.#messages())
  update      = effect(() => this.#storageSvc.set('messages', this.#messages()))

  constructor() {
   this.#destrSvc.add(() => this.destructor())

    if (this.#messages().length === 0) {
      let firstMessage = new Message().new({
        title: 'Welcome to Q App',
        body: 'This is a simple app to help you keep track of your questions and answers.',
        data: { type: 'info', content: ['Welcome to Q App'] }
      })

      this.add(firstMessage)
    }
  }

  add(message: Message) {
    if (this.#messages().length === 0) { message.id = 1 }
    else { message.id = this.#messages()[this.#messages().length - 1].id + 1 }

    this.#messages.set([...this.#messages(), message])
  }

  remove(id: number) {
    this.#messages.set(this.#messages().filter(message => message.id !== id))
  }

  destructor() {
    this.#messages.set([])
  }
}
