import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private headerSubject = new BehaviorSubject<string>('');

  setHeader(header: string) {
    this.headerSubject.next(header);
  }

  getHeader() {
    return this.headerSubject.asObservable();
  }
}
