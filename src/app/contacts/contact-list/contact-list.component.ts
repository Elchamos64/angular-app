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

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.subscription= this.contactService.contactChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
