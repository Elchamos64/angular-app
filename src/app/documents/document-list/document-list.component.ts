import {Component, OnDestroy, OnInit} from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit, OnDestroy{
  private subscription: Subscription;
  documents : Document[] = [];

  constructor( private documentService: DocumentService,
               private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    // this.documentService.documentChangedEvent.subscribe((documents: Document[]) => {
    //   this.documents = documents
    // }
    // );

    this.subscription = this.documentService.documentListChangedEvent
      .subscribe((documentsList: Document[]) => {
        this.documents = documentsList;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
