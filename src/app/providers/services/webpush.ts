import { Injectable, effect, inject } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { DOCUMENT } from '@angular/common';
import { SwPush } from "@angular/service-worker"

import { MESSAGE_URL, VAPID_PUBLIC_KEY } from "../constants"
import { MessageService } from "./message"
import { Message } from "../models/message"
import { AuthService } from "./auth"
import { UserService } from "./user"
import { DestructorService } from "./destructor"

@Injectable({
  providedIn: 'root'
})
export class PushService {
  #http           = inject(HttpClient)
  #messageSvc     = inject(MessageService)
  #swPush         = inject(SwPush)
  #authSvc        = inject(AuthService)
  #userSvc        = inject(UserService)
  #destrSvc       = inject(DestructorService)
  #document       = inject(DOCUMENT)

  #message_url    = this.#document.location.hostname === 'localhost' ? "http://localhost:8004/message/" : MESSAGE_URL

  #innited = false
  update = effect(() => {
    if (this.#userSvc.user().id !== undefined && !this.#innited) { this.#innited = true ; this.subscribe() }
  })

  constructor() { this.#destrSvc.add(() => this.destructor()) }

  private subscribe() {
    this.#swPush.requestSubscription({ serverPublicKey: VAPID_PUBLIC_KEY })
      .then(sub => { this.sendSubscrition(sub) })
      .catch(err => console.error("Could not subscribe to notifications", err))
  }

  private sendSubscrition(sub: PushSubscription) {
    let user = this.#userSvc.user()
    let headers = {
      Authorization: 'Bearer ' + this.#authSvc.access_token,
      ContentType: 'application/json'}

    let to_server = {
      user_id: user.id,
      web_token: sub.toJSON()
    }

    this.#http.put(this.#message_url + "token/user/" + user.id, to_server, { headers }).subscribe()
  }

  listen() {
    this.#swPush.messages.subscribe((message: any) => {
      if (message.notification !== undefined) {
        this.#messageSvc.add(new Message().new({ ...message.notification }))
        // other stuff
      }
    })
  }

  private destructor() {
    this.#innited = false
  }
}
