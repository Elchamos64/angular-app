import {Component, Input, OnInit} from '@angular/core';
import { Document } from '../document.model';
import {DocumentService} from '../document.service';
import {ActivatedRoute,Params, Router} from '@angular/router';

@Component({
  selector: 'app-document-detail',
  standalone: false,
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent implements OnInit{
  // @Input() document: Document;
  document: Document;
  id: number;

  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.document = this.documentService.getDocumentById(this.id);
        }
      );
  }
  // constructor() {
  //   // Initialize with a default document or handle it as needed
  //   this.document = new Document(0, 'Default Title', 'Default Content', 'https://default.url', []);
  // }

  // onDocumentSelected(document: Document) {
  //   this.document = document;
  // }

}
