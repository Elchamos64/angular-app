import {Component, OnInit} from '@angular/core';
import { Document } from '../document.model';
import {DocumentService} from '../document.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-document-edit',
  standalone: false,
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  id: number;
  document: Document;
  editMode = false;


  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      if (!this.id) {
        this.editMode = false;
        this.document = new Document(
          0,
          '',
          '',
          '',
          []
        );
        return;
      }


      this.originalDocument = this.documentService.getDocumentById(this.id);

      if (!this.originalDocument) {
        return;
      }

      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }


  onSubmit(form: NgForm) {
    const value = form.value;

    const newDocument = new Document(
      this.editMode ? this.originalDocument.id : null,
      value.name,
      value.description,
      value.url,
      []  // or this.groupContacts or whatever children you have
    );

    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }




  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }


}
