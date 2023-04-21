import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/app.component';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit {
  contacts: Array<Contact> = [];
  copyContactsArr: Array<Contact> = [];
  searchField = '';

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getContacts();
  }

  searchInContact() {
    this.copyContactsArr.length === 0 ? this.copyContactsArr = Array.from(this.contacts) : this.contacts = Array.from(this.copyContactsArr)

    this.contacts = this.contacts.filter(contact =>
      contact.name?.toLocaleLowerCase().includes(this.searchField)
    )

  }

  getContacts() {
    this.api.getContacts().subscribe({
      next: (data: Array<Contact>) => {
        this.contacts = data;
      }
    })
  }
}
