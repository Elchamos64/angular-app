import { Message } from './message.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent: Subject<Message[]> = new Subject<Message[]>();
  messages: Message[] = [];
  maxMessageId: number = 0;

  constructor(private http: HttpClient) {
    this.getMessages();  // fetch messages from backend on startup
  }

  getMessages(): void {
    this.http.get<{ message: string; messages: Message[] }>('http://localhost:3000/messages')
      .subscribe(
        (responseData) => {
          this.messages = responseData.messages;
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error) => {
          console.error('Error fetching messages:', error);
        }
      );
  }

  getMessageById(id: string): Message | undefined {
    return this.messages.find(message => message.id === id);
  }

  addMessage(message: Message): void {
    if (!message) {
      return;
    }

    // Fill required fields or check them here
    if (!message.subject || !message.msgText || !message.sender) {
      console.error('Missing required message fields');
      return;
    }

    message.id = '';  // clear id to let backend assign

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string, messageResponse: Message }>('http://localhost:3000/messages', message, { headers })
      .subscribe(
        (responseData) => {
          this.messages.push(responseData.messageResponse);
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error) => {
          console.error('Error adding message:', error);
        }
      );

  }

  updateMessage(originalMessage: Message, newMessage: Message): void {
    if (!originalMessage || !newMessage) {
      return;
    }

    const pos = this.messages.findIndex(m => m.id === originalMessage.id);
    if (pos < 0) {
      return;
    }

    newMessage.id = originalMessage.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('http://localhost:3000/messages/' + originalMessage.id, newMessage, { headers })
      .subscribe(
        () => {
          this.messages[pos] = newMessage;
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error) => {
          console.error('Error updating message:', error);
        }
      );
  }

  deleteMessage(message: Message): void {
    if (!message) {
      return;
    }

    const pos = this.messages.findIndex(m => m.id === message.id);
    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/messages/' + message.id)
      .subscribe(
        () => {
          this.messages.splice(pos, 1);
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error) => {
          console.error('Error deleting message:', error);
        }
      );
  }

  private getMaxId(): number {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}
