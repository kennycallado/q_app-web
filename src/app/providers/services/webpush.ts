import { HttpClient } from "@angular/common/http"
import { Injectable, inject } from "@angular/core"
import { SwPush } from "@angular/service-worker"

import { MessageService } from "./message"
import { Message } from "../models/message"

@Injectable({
  providedIn: 'root'
})
export class PushService {
  readonly #VAPID_PUBLIC_KEY = "BOXXP18KzhgRbUCsCLjDCvsbB_2UIYE5X-fe34rWajqMh-id15BJQ_xiSA1p8yCRzMfllMFCxS6uW-9uD1xVeFg"

  #http           = inject(HttpClient)
  #messageSvc     = inject(MessageService)
  #swPush         = inject(SwPush)

  subscribe() {
    this.#swPush.requestSubscription({ serverPublicKey: this.#VAPID_PUBLIC_KEY })
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
