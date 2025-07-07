import { Contact  } from './contact.model';
import { Injectable, EventEmitter} from '@angular/core';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import {Subject} from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class ContactService {
  contactSelected: EventEmitter<Contact> = new EventEmitter<Contact>();
  contactChangedEvent: Subject <Contact[]> = new Subject <Contact[]>();
  contacts: Contact[]=[];

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts (): Contact[] {
    return this.contacts.slice();
  }

  getContactById (id: string): Contact {
    const contact = this.contacts.find(contact => contact.id === id);
    console.log('Contact found by ID:', contact);
    return contact;
  }

  deleteContact (contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.next(this.contacts.slice());
  }


}
