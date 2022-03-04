import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  private documents: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    // this.maxDocumentId = this.getMaxId();
    this.getDocumentsHttp();
   }

   getDocuments(){
     return this.documents.slice();
   }

   getDocumentsHttp(){
     console.log('documentshttp entered');
    return this.http
     .get<Document[]>('https://lucyd-cms-default-rtdb.firebaseio.com/documents.json')
     .subscribe(
       //success method
       (documents:Document[] = []) => {
         this.documents = documents;    //Assign the array of documents received to the documents property.
         this.maxDocumentId = this.getMaxId();  //get the maximum value used for the id property in the document list, assign the value returned to the maxDocumentId
         documents.sort((a, b) => {    //Sort the list of documents by name using the sort() JavaScript array method.
           if(a.name > b.name){ return 1; }
           if(a.name < b.name){ return -1; }
           else { return 0; }
          });
            // this.documentChangedEvent.emit(this.documents.slice());   //emit the next document list change event
            let documentsListClone = this.documents.slice();
            this.documentListChangedEvent.next(documentsListClone);
       }
       //error method
       ,(error: any)=> {
         console.log(error.message)
       }
     );
   }

   getDocument(id:string){
    for(let document of this.documents){
      if(id == document.id){
        return document;
      }
    }
    return null!;
   }


  getMaxId(): number {
    let maxId = 0;
    for(let document of this.documents){
        if(parseInt(document.id, 10) > maxId){
          maxId = parseInt(document.id, 10);
        }
    }
    return maxId;
  }

   storeDocuments(){
    const documents = JSON.stringify(this.getDocuments())
     this.http
     .put(
       'https://lucyd-cms-default-rtdb.firebaseio.com/documents.json',
     documents,
     {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    }
     )
     .subscribe(()=>{
        // this.documentChangedEvent.emit(this.documents.slice()); //if something is wrong, try removing this line
        let documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone);
     })
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
    // let documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
 }

  addDocument(newDocument: Document){
    if(!newDocument){
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId + "";
    this.documents.push(newDocument);
    // let documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
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
    // let documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
  }

}
