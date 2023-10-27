import { Component, inject } from '@angular/core'
import { Router } from '@angular/router'

import { Message } from 'src/app/providers/models/message'
import { AuthService } from 'src/app/providers/services/auth'
import { MessageService } from 'src/app/providers/services/message'
import { UserService } from 'src/app/providers/services/user'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  #messageSvc = inject(MessageService)

  messages = this.#messageSvc.messages

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

  ngAfterViewInit() {
    this.#messageSvc.initMessages()
  }
}
