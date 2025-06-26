import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import {Injectable, EventEmitter } from '@angular/core';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class DocumentService {
  documentSelected: EventEmitter<Document> = new EventEmitter<Document>();
  documents: Document[] = [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }
  getDocumentById(index: number): Document {
    return this.documents.slice()[index];
  }

}
