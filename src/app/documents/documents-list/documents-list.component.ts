import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  private subscription: Subscription;

  constructor(private documentService: DocumentService,
              ) { }

  ngOnInit(): void {
    this.documentService.documentChangedEvent.subscribe(
      (document:Document[]) => {
        this.documents = document;
      }
    )
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent.subscribe(documentList => {
      this.documents = documentList;
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
