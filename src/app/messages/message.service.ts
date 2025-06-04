import {Message} from './message.model';
import {MOCKMESSAGES} from './MOCKMESSAGES';
import {EventEmitter, Injectable} from '@angular/core';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class MessageService{
  messageChangedEvent: EventEmitter<Message[]> = new EventEmitter<Message[]>();
  messages:  Message[] = [];

  constructor() {
    this.messages = MOCKMESSAGES
  }

  getMessages() {
    return this.messages.slice();
  }

  getMessagesById(id:string) {
    return this.messages.find(message => message.id == id);
  }

  addMessages(message: Message) {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }

}
