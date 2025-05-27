import { Component } from '@angular/core';
import { Message }  from '../message.model';

@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
    messages: Message[] = [
    new Message(1, 'Oscar Ramos', 'Meeting Update', 'The meeting has been moved to 3 PM.'),
    new Message(2, 'Jane Smith', 'Project Plan', 'Please review the attached project plan.'),
    new Message(3, 'John Doe', 'Welcome!', 'Welcome to the team!')
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
