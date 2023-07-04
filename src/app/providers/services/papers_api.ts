import { Injectable, Signal, computed, effect, isDevMode, signal } from "@angular/core";
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
  #paper_api = PAPER_URL
  #access_token: Signal<string> = this.authSvc.access_token;
  #papers = signal<PubPaper[]>(this.storageSvc.get('papers') as PubPaper[] || [])

  papers = computed(() => this.#papers())

  init   = effect(() => { if (this.#access_token() !== '')  this.initPapers() })
  update = effect(() => { this.storageSvc.set('papers', this.#papers()) })
  // save   = effect(() => { })

  constructor(
    private http: HttpClient,
    private authSvc: AuthService,
    private storageSvc: StorageService) {
    if (isDevMode()) this.#paper_api = "http://localhost:8032/api/v1/paper/"
  }

  private initPapers() {
    this.getApiPapers().subscribe((papers) =>
      papers.forEach((paper) => {
        // check if already exists
        if (this.#papers().find((p) => p.id === paper.id)) return;

        this.getApiPaper(paper.id).subscribe((paper) => {
          this.#papers.update((papers) => [...papers, paper]) })
      }))
  }

  private getApiPaper(id: number): Observable<PubPaper> {
    let headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.#access_token()}`,
      ContentType: 'application/json'}

    return this.http.get<PubPaper>(this.#paper_api + id, { headers })
  }

  private getApiPapers(): Observable<PubPaper[]> {
    let user = this.storageSvc.get('user')
    let headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.#access_token()}`,
      ContentType: 'application/json'}

    return this.http.get<PubPaper[]>(this.#paper_api + `user/${user.id}`, { headers })
  }
}
