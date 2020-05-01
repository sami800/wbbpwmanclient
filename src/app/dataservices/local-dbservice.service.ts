import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { IPasswordRecord } from '../models/ipassword-record';

@Injectable({
  providedIn: 'root'
})
export class LocalDBserviceService extends Dexie {

  passwords: Dexie.Table<IPasswordRecord, number>;

  constructor() {
    super('WBBPWManager');

    this.version(2).stores({
      contacts: '++id, first, last',
      passwords: '++id, domain, password, updatedate',
    });

    this.passwords = this.table('passwords');

    this.passwords.put({domain: 'www.google.com', password: 'hashgoeshere', updatedate: '01-01-2020'});
    this.passwords.put({domain: 'www.google1.com', password: 'hashgoeshere1', updatedate: '01-01-2020'});
    this.passwords.put({domain: 'www.google2.com', password: 'hashgoeshere2', updatedate: '01-01-2020'});
  }

}

