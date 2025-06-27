import {Component, OnInit} from '@angular/core';
import { Contact } from '../contact.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ContactService} from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent implements OnInit{
  contact: Contact;
  id: string;

  constructor(private contactService: ContactService,
              private router : Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.contact = this.contactService.getContactById(this.id);
          console.log('Route ID:', this.id);
          console.log('Contact fetched:', this.contact);
        }
      );
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
  }
}
