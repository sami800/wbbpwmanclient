import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { PasswordRecord } from '../models/password-record';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalDBserviceService extends Dexie {

  passwords: Dexie.Table<PasswordRecord, number>;

  constructor() {

    super('WBBPWManager');

    this.version(2).stores({
      passwords: '++id, domain, password, updatedate',
    });

    this.passwords = this.table('passwords');
  }

  addPassword(password: PasswordRecord) {
    this.passwords.put(password)
  }

  getPassword(search: string) {
    this.passwords.where({domain: search}).first(result => {
      console.log(JSON.stringify(result));
    }).catch((error) => {
        console.log(error);
    });
  }

  getAllPassword() {
    this.passwords.toArray(result => {
      console.log(JSON.stringify(result));
    }).catch((error) => {
        console.log(error);
    });
  }

  checkPassword(search: string) {
    this.passwords.where({domain: search}).first(result => {
      console.log(JSON.stringify(result));
    }).catch((error) => {
        console.log(error);
    });
  }

}
