import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  // transform(contacts: Contact[], term: any): any {
  //   const filteredContacts: Contact[] = [];  //create a new array to contain the filtered list of contacts
  //   for (let i=0; i<contacts.length; i++) {  //FOR every contact in the contacts list
  //     let contact = contacts[i];
  //     if (contact.name.toLowerCase().includes(term)) {  //IF the contact's name includes the value of the search term THEN
  //       filteredContacts.push(contact);                 //Add the contact to the new filtered array
  //     }
  //   }
  //   if (filteredContacts.length < 1){     // If the new filtered array has no contacts in it THEN
  //       return contacts;                  //RETURN the original contacts list
  //   }
  //   return filteredContacts;              //RETURN the new filtered array of contacts
  // }

  transform(contacts: Contact[], term: string) {
    let filteredContacts: Contact[] =[];
    if (term && term.length > 0) {
       filteredContacts = contacts.filter(
          //fat arrow function passed to the filter() array method above receives a reference to the next ...
          //...Contact object in the contacts array
          //fat arrow function gets the value of the name property of the Contact object passed to the function, ...
          //...and then converts it to lowercase letters using the JavaScript toLowerCase() String method
          (contact:Contact) => contact.name.toLowerCase()
          //It then calls the JavaScript includes() String method.
          .includes(
            //The search term passed as an input into the transform() method is converted into lowercase letters...
            //...and passed to the includes() method
            term.toLowerCase())
            //The includes() method returns true if the contact’s name contains the value of the term,...
            //...and the Contact object is then added to the filtered array.
       );
    }
    if (filteredContacts.length < 1){
       return contacts;
    }
    return filteredContacts;
 }
}
