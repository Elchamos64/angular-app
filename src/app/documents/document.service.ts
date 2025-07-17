import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import {Injectable, EventEmitter } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class DocumentService {
  documentSelected: EventEmitter<Document> = new EventEmitter<Document>();
  // documentChangedEvent: EventEmitter<Document[]> = new EventEmitter<Document[]>();
  documentListChangedEvent: Subject<Document[]> = new Subject<Document[]>();
  documents: Document[] = [];
  maxDocumentId: number;


  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): void {
    this.http.get<{ message: string, documents: Document[] }>('http://localhost:3000/documents')
      .subscribe(
        (response) => {
          // Access the documents array from the response
          const documents = response.documents;

          // Assign to the documents property
          this.documents = documents;

          // Update maxDocumentId using your existing method
          this.maxDocumentId = this.getMaxId();

          // Sort documents by name
          this.documents.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });

          // Emit the updated documents list as a clone (slice)
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.error('Error fetching documents:', error);
        }
      );
  }


  storeDocuments(): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(
      'http://localhost:3000/documents', // <-- points to your Node API
      this.documents,
      { headers: headers }
    ).subscribe(() => {
      this.documentListChangedEvent.next(this.documents.slice());
    }, (error) => {
      console.error('Error storing documents:', error);
    });
  }

  getDocumentById(index: number): Document {
    return this.documents.slice()[index];
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // Make DELETE request to backend
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        () => {
          // On success, remove from local array and emit update
          this.documents.splice(pos, 1);
          this.sortAndSend();
        },
        (error) => {
          console.error('Delete failed:', error);
        }
      );
  }


  getMaxId(): number {
    let maxId = 0;

    for (let document of this.documents) {
      const currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }


  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = 0;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      );
  }

  sortAndSend() {
    this.documents.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    this.documentListChangedEvent.next(this.documents.slice());
  }

  updateDocument(document: Document, newDocument: Document) {
    if (!document || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    newDocument.id = document.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put('http://localhost:3000/documents/' + document.id,
      newDocument,
      { headers: headers })
      .subscribe(
        (response) => {
          // Update local array only after successful update on server
          this.documents[pos] = newDocument;
          this.sortAndSend();
        },
        (error) => {
          console.error('Update failed:', error);
        }
      );
  }


}
