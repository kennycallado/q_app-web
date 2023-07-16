import { HttpClient } from "@angular/common/http"
import { Injectable, inject } from "@angular/core"
import { SwPush } from "@angular/service-worker"

import { VAPID_PUBLIC_KEY } from "../constants"
import { MessageService } from "./message"
import { Message } from "../models/message"
import { AuthService } from "./auth"

@Injectable({
  providedIn: 'root'
})
export class PushService {
  #http           = inject(HttpClient)
  #messageSvc     = inject(MessageService)
  #swPush         = inject(SwPush)
  #authSvc        = inject(AuthService)

  subscribe() {
    this.#swPush.requestSubscription({ serverPublicKey: VAPID_PUBLIC_KEY })
      .then(sub => { this.sendSubscrition(sub) })
      .catch(err => console.error("Could not subscribe to notifications", err))
  }

  private sendSubscrition(sub: PushSubscription) {
    let headers = {
      Authorization: 'Bearer ' + this.#authSvc.access_token,
      ContentType: 'application/json'}

    let to_server = {
      user_id: 1,
      web_token: sub.toJSON()
    }

    // this.#http.put("http://localhost:9000/api/v1/messaging/token/1", to_server, { headers }).subscribe()
    this.#http.put("http://questions.kennycallado.dev/api/v1/messaging/token/1", to_server, { headers }).subscribe()
  }

  listen() {
    this.#swPush.messages.subscribe((message_come: any) => {

      // console.log("Message received from server: ", message)
      // console.log("Parse", JSON.parse(message))
      // console.log(message.notification)

      let message = JSON.parse(message_come)
      console.log({ message })

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
