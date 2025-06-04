import {Component, Input, OnInit} from '@angular/core';
import { Message } from '../../message.model';
import {MessageService} from '../../message.service';
import {ContactService} from '../../../contacts/contact.service';
import {Contact} from '../../../contacts/contact.model';
@Component({
  selector: 'app-message-item',
  standalone: false,
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent implements OnInit {
 @Input() message: Message;
 messageSender: String;

 constructor(private contactService: ContactService) { }

  ngOnInit() {
    const contact: Contact = this.contactService.getContactById(this.message.sender);
    this.messageSender = contact ? contact.name : this.message.sender;
}
}
