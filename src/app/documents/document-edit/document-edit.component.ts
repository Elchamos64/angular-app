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
    const value = form.value; // get values from form’s fields

    const newDocument = new Document(
      value.title,
      value.description,
      value.url, null // children or nested docs if applicable, or adjust as needed
    );

    if (this.editMode) {
      newDocument.id = this.originalDocument.id;
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
