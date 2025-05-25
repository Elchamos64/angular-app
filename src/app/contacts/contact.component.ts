import { Component } from '@angular/core';
import { Contact } from './contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  standalone: false,
})
export class ContactComponent {
  selectedContact: Contact;
}
