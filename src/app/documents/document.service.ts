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
    this.http.get<{ [key: string]: Document }>('https://cms-app-1-d3b7f-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        (documentsObj) => {
          // Convert the object returned from Firebase into an array of documents
          const documents: Document[] = [];
          for (const key in documentsObj) {
            if (documentsObj.hasOwnProperty(key)) {
              documents.push(documentsObj[key]);
            }
          }

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
    // Convert documents array to JSON string
    const documentsJson = JSON.stringify(this.documents);

    // Set HTTP headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // PUT request to Firebase to update the documents list
    this.http.put(
      'https://cms-app-1-d3b7f-default-rtdb.firebaseio.com/documents.json',
      documentsJson,
      { headers: headers }
    )
      .subscribe(() => {
        // Notify subscribers that the document list has changed
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
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.storeDocuments()
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

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId;
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument (document: Document, newDocument: Document) {
    if (!document || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    newDocument.id = document.id;
    this.documents[pos] = newDocument;
    this.storeDocuments()
  }

}
