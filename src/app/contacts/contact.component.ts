import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import {ContactService} from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  standalone: false,
})
export class ContactComponent implements OnInit{
  selectedContact: Contact;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.contactSelected.subscribe(contact => this.selectedContact = contact);
  }
}
