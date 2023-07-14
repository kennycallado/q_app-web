import { Component, inject } from '@angular/core'

import { Message } from 'src/app/providers/models/message'
import { MessageService } from 'src/app/providers/services/message'
import { PushService } from 'src/app/providers/services/webpush'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  #messageSvc = inject(MessageService)
  #webpushSvc = inject(PushService)

  messages = this.#messageSvc.messages

  constructor() {
    this.#webpushSvc.subscribe()
  }

  // unused
  subscribeNotifications() {
    this.#webpushSvc.subscribe()
  }

  addMessage() {
    let message = new Message().new({
      title: 'New message',
      body: 'This is a new message',
      data: { type: 'info', content: ['This is an important message to read', '🔖 🔖 🔖'] }
    })

    this.#messageSvc.add(message)
  }

  removeMessage(id: number) {
    this.#messageSvc.remove(id)
  }
}
