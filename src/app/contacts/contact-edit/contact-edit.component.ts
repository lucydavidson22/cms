import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DragDropData } from 'ng2-dnd';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = params['id'];
        if(!this.id){
          this.editMode = false;
          return;
        }
        this.originalContact = this.contactService.getContact(this.id);
        if(!this.originalContact){
          return;
        }
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));

        if(this.originalContact.group){
          this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
        }
      })
  }

  onRemoveItem(index: number){
    if (index < 0 || index >= this.groupContacts.length) {
      return;
   }
   this.groupContacts.splice(index, 1);
  }

  onCancel(){
    this.router.navigate(['contacts']);
  }

  onSubmit(form: NgForm){
    const value = form.value;
    console.log('value', value)
    const newContact = new Contact("0", value.name, value.email, value.phone, value.imageUrl, this.groupContacts);

    console.log('some new contact', newContact)
    if(this.editMode){
      this.contactService.updateContact(this.originalContact, newContact)
    } else{
      this.contactService.addContact(newContact)
    }
    this.router.navigate(['contacts']);
  }

  addToGroup($event: any){
    console.log("contact added to group");
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact){
        return;
   }
   console.log("something wrong", this.groupContacts);
   this.groupContacts.push(selectedContact);
  }

  isInvalidContact(newContact: Contact){
    if (!newContact) {// newContact has no value
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
       return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++){
       if (newContact.id === this.groupContacts[i].id) {
         return true;
      }
    }
    return false;
  }
}
