import {Component, OnInit} from '@angular/core';
import {Contact} from '../contact.model';
import {ContactService} from '../contact.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Document} from '../../documents/document.model';

@Component({
  selector: 'app-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode = false;
  id: string;


  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (!id) {
        this.editMode = false;
        this.contact = new Contact(
          null,
          '',
          '',
          '',
          '',
          []
        );
        this.groupContacts = [];
        return;
      }

      this.originalContact = this.contactService.getContactById(id);
      if (!this.originalContact) {
        return;
      }

      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact)); // Deep clone

      if (this.contact.group && this.contact.group.length > 0) {
        this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
      }
    });
  }


  isInvalidContact(newContact: Contact): boolean {
    // Case 1: If newContact is null or undefined
    if (!newContact) {
      return true;
    }

    // Case 2: Prevent adding the contact to its own group
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }

    // Case 3: Prevent adding duplicates to the group
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }

    // If all checks pass, the contact is valid
    return false;
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;

    if (this.isInvalidContact(selectedContact)) {
      return;
    }

    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    const newContact = new Contact(
      null, // or generate ID if needed
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts
    );

    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }



  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
