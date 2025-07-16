import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
  standalone: false
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string) {
    let filteredContacts: Contact[] = [];

    if (term && term.length > 0) {
      filteredContacts = contacts.filter(
        (contact: Contact) =>
          contact.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    return filteredContacts.length > 0 ? filteredContacts : contacts;
  }


}
