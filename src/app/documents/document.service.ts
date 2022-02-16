import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  private documents: Document[] = [];
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
   }

   getDocuments(){
     return this.documents.slice();
   }

   getDocument(id:string){
    for(let document of this.documents){
      if(id == document.id){
        return document;
      }
    }
    return null!;
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
    // this.documentChangedEvent.emit(this.documents.slice());
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
 }

  getMaxId(): number {
    let maxId = 0;
    for(let document of this.documents){
        if(parseInt(document.id) > maxId){
          maxId = parseInt(document.id);
        }
    }
    return maxId
  }

  addDocument(newDocument: Document){
    if(!newDocument){
      return;
    }

    this.maxDocumentId++;
    let a = parseInt(newDocument.id);
    a = this.maxDocumentId;
    this.documents.push(newDocument);
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document){
    if(!(originalDocument || newDocument)){
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if(pos < 0){
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

}
