import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  contacts: Contact[] = [ ];
  maxContactId: number;

  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    // this.maxContactId = this.getMaxId();
    this.getContactsHttp();
   }

   getContacts():Contact[]{
     return this.contacts.slice();
   }

   getContactsHttp(){
    return this.http
    // .get<Contact[]>('https://lucyd-cms-default-rtdb.firebaseio.com/contacts.json')
    .get<Contact[]>('http://localhost:3000/contacts')
    .subscribe(
      //success method
      (contacts:Contact[]) => {
        this.contacts = contacts;    //Assign the array of contacts received to the contacts property.
        this.maxContactId = this.getMaxId();  //get the maximum value used for the id property in the contact list, assign the value returned to the maxContactId
        contacts.sort((currentElement, nextElement) => {    //Sort the list of contacts by name using the sort() JavaScript array method.
          if(currentElement > nextElement){ return 1; }
          if(currentElement < nextElement){ return -1; }
          else { return 0; }
         });
           this.contactListChangedEvent.next(this.contacts.slice());
      }
      //error method
      ,(error: any)=> {
        console.log(error.message)
      }
    );
   }

   getContact(id:string){
    for(let contact of this.contacts){
      if(id == contact.id){
        return contact;
      }
    }
    return null!;
   }


   getMaxId(): number {
      let maxId = 0;
      for(let contact of this.contacts){
          if(parseInt(contact.id, 10) > maxId){
            maxId = parseInt(contact.id, 10);
          }
      }
      return maxId
    }

  //  deleteContact(contact: Contact){
  //   if (!contact) {
  //     return;
  //  }
  //  const pos = this.contacts.indexOf(contact);
  //  if (pos < 0) {
  //     return;
  //  }
  //  this.contacts.splice(pos, 1);
  //   this.storeContacts();
  //  }

  // addContact(newContact: Contact){
  //   if(!newContact){
  //     return;
  //   }
  //   this.maxContactId++;
  //   newContact.id= this.maxContactId + "";
  //   this.contacts.push(newContact);
  //   this.storeContacts();
  // }

  // updateContact(originalContact: Contact, newContact: Contact){
  //   console.log('new contact', newContact)
  //   if(!(originalContact || newContact)){
  //     return;
  //   }
  //   const pos = this.contacts.indexOf(originalContact);
  //   if(pos < 0){
  //     return;
  //   }
  //   console.log("something here!");
  //   newContact.id = originalContact.id;
  //   this.contacts[pos] = newContact;
  //   this.storeContacts();
  // }

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }
    console.log('try to create a contact');
    // make sure id of the new Contact is empty
    contact.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts/',
      contact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new contact to contacts
          this.contacts.push(responseData.contact);
          this.contactListChangedEvent.next(this.contacts.slice());
          // this.sortAndSend();
        }
      );
      console.log('create contact try 2');
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Contact to the id of the old Contact
    newContact.id = originalContact.id;
    // newContact._id = originalContact._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        () => {
          this.contacts[pos] = newContact;
          this.contactListChangedEvent.next(this.contacts.slice());
          // this.sortAndSend();
        }
      );
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        () => {
          this.contacts.splice(pos, 1);
          this.contactListChangedEvent.next(this.contacts.slice());
          // this.sortAndSend();
        }
      );
  }

  // storeContacts(){
  //   const contacts = JSON.stringify(this.getContacts())
  //    this.http
  //    .put(
  //      'https://lucyd-cms-default-rtdb.firebaseio.com/contacts.json',
  //    contacts,
  //    {
  //     headers: new HttpHeaders({'Content-Type': 'application/json'}),
  //   }
  //    )
  //    .subscribe(()=>{
  //       this.contactListChangedEvent.next(this.contacts.slice());
  //    })
  // }
}
