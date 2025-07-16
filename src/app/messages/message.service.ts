import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent: EventEmitter<Message[]> = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
    // Initialize messages from mock or empty, depending on your app logic
    this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }

  // Returns a cloned copy of messages array
  getMessages(): void {
    this.http.get<{ [key: string]: Message }>('https://cms-app-1-d3b7f-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        (messagesObj) => {
          const messages: Message[] = [];
          for (const key in messagesObj) {
            if (messagesObj.hasOwnProperty(key)) {
              messages.push(messagesObj[key]);
            }
          }
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.emit(this.messages.slice());
        },
        (error) => {
          console.error('Error fetching messages:', error);
        }
      );
  }

  // Find max id number in messages for new message id generation
  getMaxId(): number {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  // Save messages array to Firebase using HTTP PUT
  storeMessages(): void {
    const messagesJson = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(
      'https://cms-app-1-d3b7f-default-rtdb.firebaseio.com/messages.json',
      messagesJson,
      { headers }
    ).subscribe(() => {
      this.messageChangedEvent.emit(this.messages.slice());
    }, (error) => {
      console.error('Error storing messages:', error);
    });
  }

  // Find message by id
  getMessagesById(id: string): Message | undefined {
    return this.messages.find(message => message.id === id);
  }

  // Add a new message and store it in Firebase
  addMessage(message: Message): void {
    if (!message) {
      return;
    }
    this.maxMessageId++;
    message.id = this.maxMessageId.toString();
    this.messages.push(message);
    this.storeMessages();
  }
}
