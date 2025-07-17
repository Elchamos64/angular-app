import {Component, OnInit, OnDestroy} from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit, OnDestroy{
  private subscription: Subscription;
  contacts: Contact[] = [];
  term: string;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }


  search(value: string) {

    this.term = value;

  }

  ngOnInit() {
    // Start fetching contacts from service (async)
    this.contactService.getContacts();

    // Subscribe to contact list changes
    this.subscription = this.contactService.contactListChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
