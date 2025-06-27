import {Component, Input, OnInit} from '@angular/core';
import { Document } from '../document.model';
import {DocumentService} from '../document.service';
import {ActivatedRoute,Params, Router} from '@angular/router';
import {WindRefService} from '../../wind-ref.service';

@Component({
  selector: 'app-document-detail',
  standalone: false,
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent implements OnInit{
  // @Input() document: Document;
  document: Document;
  nativeWindow: any;
  id: number;

  constructor(private documentService: DocumentService,
              private router: Router,
              private WindowRefService: WindRefService,
              private route: ActivatedRoute) {
    this.nativeWindow = this.WindowRefService.getNativeWindow();
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

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }
  // constructor() {
  //   // Initialize with a default document or handle it as needed
  //   this.document = new Document(0, 'Default Title', 'Default Content', 'https://default.url', []);
  // }

  // onDocumentSelected(document: Document) {
  //   this.document = document;
  // }

}
