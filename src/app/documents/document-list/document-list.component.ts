import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit{

  documents : Document[] = [];

  constructor( private documentService: DocumentService) { }

  ngOnInit() {
    this.documents = this.documentService.getDocuments()
  }


}
