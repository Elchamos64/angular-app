import { Contact  } from './contact.model';
import { Injectable, EventEmitter} from '@angular/core';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class ContactService {
  contactSelected: EventEmitter<Contact> = new EventEmitter<Contact>();
  contacts: Contact[]=[];

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts (): Contact[] {
    return this.contacts.slice();
  }

  getContactById (id:string): Contact {
    return this.contacts.find(contact => contact.id == id);
  }


}
