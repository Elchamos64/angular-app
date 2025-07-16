import { Contact } from './contact.model';
import { Injectable, EventEmitter } from '@angular/core';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelected: EventEmitter<Contact> = new EventEmitter<Contact>();
  contactChangedEvent: Subject<Contact[]> = new Subject<Contact[]>();
  contacts: Contact[] = [];
  maxContactId: number;

  constructor(private http: HttpClient) {
    this.contacts = [];
    this.maxContactId = 0;
    this.fetchContacts();  // Fetch contacts from Firebase at startup
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContactById(id: string): Contact {
    const contact = this.contacts.find(contact => contact.id === id);
    console.log('Contact found by ID:', contact);
    return contact;
  }
  // Add this method to fetch contacts from Firebase
  fetchContacts(): void {
    this.http.get<{ [key: string]: Contact }>('https://cms-app-1-d3b7f-default-rtdb.firebaseio.com/contacts.json')
      .subscribe(
        (contactsObj) => {
          const contacts: Contact[] = [];
          for (const key in contactsObj) {
            if (contactsObj.hasOwnProperty(key)) {
              contacts.push(contactsObj[key]);
            }
          }
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contactChangedEvent.next(this.contacts.slice());
        },
        (error) => {
          console.error('Error fetching contacts:', error);
        }
      );
  }

  storeContacts(): void {
    const contactsJson = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(
      'https://cms-app-1-d3b7f-default-rtdb.firebaseio.com/contacts.json',
      contactsJson,
      { headers: headers }
    ).subscribe(() => {
      this.contactChangedEvent.next(this.contacts.slice());
    }, (error) => {
      console.error('Error storing contacts:', error);
    });
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.storeContacts();
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
    this.storeContacts();
  }

  updateContact(contact: Contact, newContact: Contact) {
    if (!contact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    newContact.id = contact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }
}
