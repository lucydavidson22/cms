import { Pipe, PipeTransform } from '@angular/core';
import { Document } from './document.model';

@Pipe({
  name: 'documentsFilter'
})
export class DocumentsFilterPipe implements PipeTransform {
  transform(documents: Document[], term: string) {
    let filteredContacts: Document[] =[];
    if (term && term.length > 0) {
      filteredContacts = documents.filter(
        (document: Document) => {
          const name = document.name.toLowerCase();
          const category = document.category.toLowerCase();
          const date = document.date.toLowerCase();
          const termLowerCase = term.toLowerCase();
          return name.includes(termLowerCase) || category.includes(termLowerCase) || date.includes(termLowerCase);
        }
      );
    }
    if (filteredContacts.length < 1){
      return documents;
    }
    return filteredContacts;
  }

}
