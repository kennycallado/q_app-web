import { HttpClient } from "@angular/common/http"
import { Injectable, inject } from "@angular/core"
import { SwPush } from "@angular/service-worker"

import { VAPID_PUBLIC_KEY } from "../constants"
import { MessageService } from "./message"
import { Message } from "../models/message"

@Injectable({
  providedIn: 'root'
})
export class PushService {
  #http           = inject(HttpClient)
  #messageSvc     = inject(MessageService)
  #swPush         = inject(SwPush)

  subscribe() {
    this.#swPush.requestSubscription({ serverPublicKey: VAPID_PUBLIC_KEY })
      .then(sub => { this.sendSubscrition(sub) })
      .catch(err => console.error("Could not subscribe to notifications", err))
  }

  private sendSubscrition(sub: PushSubscription) {
    // this.#http.post("http://localhost:2000/api/v1/push/subs", sub).subscribe()
    this.#http.post<any>('https://questions.kennycallado.dev/api/v1/push/subs', sub).subscribe()
  }

  listen() {
    this.#swPush.messages.subscribe((message: any) => {

      let new_message = new Message().new({
        title: message.notification.title,
        body: message.notification.body,
        data: {
          type: message.notification.data.type,
          content: message.notification.data.content
        }
      })

      this.#messageSvc.add(new_message)
    })

  }
}
