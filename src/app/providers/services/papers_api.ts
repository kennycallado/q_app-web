import { Injectable, Signal, computed, effect, inject, isDevMode, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { PAPER_URL } from "../constants";
import { PubPaper } from "../models/paper"

import { AuthService } from "./auth";
import { StorageService } from "./storage";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaperService {
  #paper_url  = isDevMode() ? "http://localhost:8032/api/v1/paper/" : PAPER_URL ;

  #http       = inject(HttpClient)
  #authSvc    = inject(AuthService)
  #storageSvc = inject(StorageService)

  #access_token: Signal<string> = this.#authSvc.access_token;

  #papers = signal<PubPaper[]>(this.#storageSvc.get('papers') as PubPaper[] || [])
  papers = computed(() => this.#papers())

  #initialized = false
  init = effect(() => {
    if (!this.#initialized) this.initPapers() })
  // #init   = effect(() => { if (this.#access_token() !== '')  this.initPapers() })
  // init   = effect(() => { this.initPapers() })
  // update = effect(() => { this.#storageSvc.set('papers', this.#papers()) })
  // save   = effect(() => { })

  constructor() {
    console.log('PaperService')
  }

  private initPapers() {
    this.getApiPapers().subscribe((papers) =>
      papers.forEach((paper) => {
        // check if already exists
        if (this.#papers().find((p) => p.id === paper.id)) return ;

        this.getApiPaper(paper.id).subscribe((paper) => {
          this.#papers.update((papers) => [...papers, paper]) })
      }))
    this.#initialized = true
  }

  private getApiPaper(id: number): Observable<PubPaper> {
    let headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.#access_token()}`,
      ContentType: 'application/json'}

    return this.#http.get<PubPaper>(this.#paper_url + id, { headers })
  }

  private getApiPapers(): Observable<PubPaper[]> {
    let user = this.#storageSvc.get('user')
    let headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.#access_token()}`,
      ContentType: 'application/json'}

    return this.#http.get<PubPaper[]>(this.#paper_url + `user/${user.id}`, { headers })
  }
}
