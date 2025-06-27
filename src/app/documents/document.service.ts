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
  documentChangedEvent: EventEmitter<Document[]> = new EventEmitter<Document[]>();
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

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }

}
