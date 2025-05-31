import { Component, Input } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-detail',
  standalone: false,
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent {
  @Input() document: Document;

  // constructor() {
  //   // Initialize with a default document or handle it as needed
  //   this.document = new Document(0, 'Default Title', 'Default Content', 'https://default.url', []);
  // }

  // onDocumentSelected(document: Document) {
  //   this.document = document;
  // }

}
