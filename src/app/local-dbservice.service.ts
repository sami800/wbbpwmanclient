import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { IContactInfo } from './icontactinfo';
import { IPasswordRecord } from './ipassword-record';

@Injectable({
  providedIn: 'root'
})
export class LocalDBserviceService extends Dexie {
  
  contacts: Dexie.Table<IContactInfo, number>;
  passwords: Dexie.Table<IPasswordRecord, number>;

  constructor() {  
    super("WBBPWManager");
    
    this.version(2).stores({
      contacts: '++id, first, last',
      passwords: '++id, domain, password, updatedate',
    });
    
    this.contacts = this.table("contacts");
    this.passwords = this.table("passwords");
    
    this.contacts.put({first: "Test", last: "Name"});
    this.passwords.put({domain: "www.google.com", password: "hashgoeshere", updatedate: "01-01-2020"});
    this.contacts.put({first: "Test1", last: "Name1"});
    this.passwords.put({domain: "www.google1.com", password: "hashgoeshere1", updatedate: "01-01-2020"});
    this.contacts.put({first: "Test2", last: "Name2"});
    this.passwords.put({domain: "www.google2.com", password: "hashgoeshere2", updatedate: "01-01-2020"});
  }
  
}

