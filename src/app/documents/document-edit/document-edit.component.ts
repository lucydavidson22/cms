import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') docForm: NgForm;
  subscription: Subscription;
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  id: string;

  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if(!this.id){
          this.editMode = false;
          return;
        }
        this.originalDocument = this.documentService.getDocument(this.id);
        if(!this.originalDocument){
          return;
        }
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      })
  }

  onCancel(){
    this.router.navigate(['/documents']);
  }

  onSubmit(form: NgForm){
    const value = form.value;
    // console.log(value.name, value.id);
    const newDocument = new Document('0', value.name, value.url, value.date, value.clientSponsor, value.location, value.publication, value.category, value.tangibleItems, value.description, value.profileStartedBy, value.profileStatus);
                                    //could an error be here because it expects a value.id
    if(this.editMode){
      this.documentService.updateDocument(this.originalDocument, newDocument)
    } else{
      this.documentService.addDocument(newDocument)
    }
    this.router.navigate(['documents']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}

}
