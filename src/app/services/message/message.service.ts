import { Injectable } from '@angular/core';
import {Toast} from 'ng-zorro-antd-mobile';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  error(message: string) {
    this.messages.push(message);
    Toast.show(message, 2000);
  }

  clear() {
    this.messages = [];
  }

  constructor() { }
}
