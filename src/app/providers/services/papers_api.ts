import { Injectable, computed, effect, inject, isDevMode, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { PAPER_URL } from "../constants";
import { PubPaper, PubPaperPush } from "../models/paper"

import { AuthService } from "./auth";
import { StorageService } from "./storage";
import { Observable } from "rxjs";
import { UserService } from "./user";
import { DestructorService } from "./destructor";

@Injectable({
  providedIn: 'root'
})
export class PaperService {
  #storageSvc = inject(StorageService)
  #destrSvc   = inject(DestructorService)
  #authSvc    = inject(AuthService)
  #userSvc    = inject(UserService)
  #http       = inject(HttpClient)

  #paper_url  = isDevMode() ? "http://localhost:8032/api/v1/paper/" : PAPER_URL ;
  // #paper_url  = "http://localhost:8032/api/v1/paper/"

  #papers = signal<PubPaper[]>(this.#storageSvc.get('papers') as PubPaper[] || [])
  papers  = computed(() => this.#papers())
  update = effect(() => { this.#storageSvc.set('papers', this.#papers()) })

  // initialized = false
  // init   = effect(() => { if (!this.initialized()) this.initPapers() }, { allowSignalWrites: true })

  constructor() { this.#destrSvc.add(() => this.destructor()) }

  initPapers() {
    // this.initialized = true
    this.#userSvc.me() // keeps the user updated. Should be better way

    this.getApiPapers().subscribe((papers) => {
      for (let paper of papers) {
        if (this.#papers().some((p) => p.id === paper.id)) continue ;
        else this.getApiPaper(paper.id)
          .subscribe((paper) => { this.#papers.set([...this.#papers(), paper]) })
      } })
  }

  postPaper(paper: PubPaper) {
    let headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.#authSvc.access_token}`,
      ContentType: 'application/json'}

    // refrescar user.project.record
    let paperPush: PubPaperPush = {
      ...paper,
      resource_id: paper.resource.id,
      user_record: this.#userSvc.user().project.record,
    }

    this.#http.post<any>(this.#paper_url + paperPush.id, paperPush, { headers })
      .subscribe((res) => { this.#userSvc.update_record(res.user_record) })
  }

  private getApiPaper(id: number): Observable<PubPaper> {
    let headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.#authSvc.access_token}`,
      ContentType: 'application/json'}

    return this.#http.get<PubPaper>(this.#paper_url + id, { headers })
  }

  private getApiPapers(): Observable<PubPaper[]> {
    let user = this.#storageSvc.get('user')
    let headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.#authSvc.access_token}`,
      ContentType: 'application/json'}

    return this.#http.get<PubPaper[]>(this.#paper_url + `user/${user.id}`, { headers })
  }

  destructor() {
    this.#papers.set([])
  }
}
