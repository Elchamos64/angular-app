import { Contact  } from './contact.model';
import { Injectable, EventEmitter} from '@angular/core';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import {Subject} from 'rxjs';
import {Document} from '../documents/document.model';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class ContactService {
  contactSelected: EventEmitter<Contact> = new EventEmitter<Contact>();
  contactChangedEvent: Subject <Contact[]> = new Subject <Contact[]>();
  contacts: Contact[]=[];
  maxContactId: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
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

  getMaxId(): number {
    let maxId = 0;

    for (let contact of this.contacts) {
      const currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }
    this.maxContactId++;
    contact.id = this.maxContactId.toString();
    this.contacts.push(contact);
    this.contactChangedEvent.next(this.contacts.slice());
  }


  updateContact (contact: Contact, newContact: Contact) {
    if (!contact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    newContact.id = contact.id;
    this.contacts[pos] = newContact;
    this.contactChangedEvent.next(this.contacts.slice());
  }


}
