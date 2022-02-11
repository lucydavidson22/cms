import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-documents-detail',
  templateUrl: './documents-detail.component.html',
  styleUrls: ['./documents-detail.component.css']
})
export class DocumentsDetailComponent implements OnInit {
  document!: Document;
  id!: string;
  nativeWindow: any;

  constructor(private documentService: DocumentService,
              private windowRefService: WindRefService,
              private route: ActivatedRoute,
              private router: Router) {
    this.nativeWindow = windowRefService.getNativeWindow();
               }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.document = this.documentService.getDocument(this.id);
      }
    )
  }

  onEditDocument(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onView(){
    if(this.document.url){
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete(){
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['documents'], {relativeTo: this.route});
  }

}
