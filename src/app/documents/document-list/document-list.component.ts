import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() documentWasSelected = new EventEmitter<Document>();
  documents: Document[] = [
    new Document(1, 'Document 1', 'Content of Document 1', 'this is a URL', []),
    new Document(2, 'Document 2', 'Content of Document 2', 'this is a URL', []),
    new Document(3, 'Document 3', 'Content of Document 3', 'this is a URL', [])
  ];
  constructor() { }

  onDocumentSelected(document: Document) {
    this.documentWasSelected.emit(document);
  }

}
