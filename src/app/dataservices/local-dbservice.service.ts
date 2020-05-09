import { Injectable } from '@angular/core';
import { PasswordRecord } from '../models/password-record';

@Injectable({
  providedIn: 'root'
})
export class LocalDBserviceService {

  DB_VERSION: number;
  DB_NAME: string;

  db: any;

  objectStore: any;

  DBOpenRequest: IDBOpenDBRequest;

  constructor() {

    const DBOpenRequest = indexedDB.open('WBBPasswordManager', 1);

    DBOpenRequest.onerror = (event) => {
      console.warn(event);
    };

    DBOpenRequest.onsuccess = (event) => {
      this.db = DBOpenRequest.result;
      console.log(event)
    };

    DBOpenRequest.onupgradeneeded = (event) => {
      this.db = DBOpenRequest.result;
      console.log(event)
      this.objectStore = this.db.createObjectStore('passwordlist', { keyPath: 'id', autoIncrement:true });

      this.objectStore.createIndex('id', 'id', { unique: true});
      this.objectStore.createIndex('domain', 'domain', { unique: false });
      this.objectStore.createIndex('password', 'password', { unique: false });
      this.objectStore.createIndex('updatetime', 'updatetime', { unique: false });
    };
  };


  getObjectStore(storename: string, mode: string) {
    const tx = this.db.transaction(storename, mode)
    return tx.objectStore(storename);
  }

  completeUpdate() {
    const objectStore = this.getObjectStore('passwordlist', 'readwrite')
    objectStore.close();
  }

  addPassword(passwordtoadd: PasswordRecord) {

    const objectStoreRequest = this.getObjectStore('passwordlist', 'readwrite')

    objectStoreRequest.put({domain:passwordtoadd.domain,password: passwordtoadd.pw,
      updatetime: passwordtoadd.updatedate})

    objectStoreRequest.onsuccess = (event) => {
      console.log(event)
    }

  }

  getFromDomain(search: string) {
    this.objectStore.where({domain: search}).first(result => {
      console.log(JSON.stringify(result));
    }).catch((error) => {
        console.log(error);
    });
  }

  getFromHash(search: string) {
    this.objectStore.where({password: search}).first(result => {
      console.log(JSON.stringify(result));
    }).catch((error) => {
        console.log(error);
    });
  }

  checkRecordExpiry(search: string) {
    this.objectStore.where('updatedate').between( Date.parse(search) - 30, Date.parse(search) - 60, true, true).each(result => {
      console.log(JSON.stringify(result));
    }).catch((error) => {
        console.log(error);
    });
  }

  getAllPasswords() {
    this.objectStore.toArray(result => {
      console.log(JSON.stringify(result));
    }).catch((error) => {
        console.log(error);
    });
  }

  checkPassword(search: string) {
    const objectStoreRequest = this.getObjectStore('passwordlist', 'readonly')

    const request = objectStoreRequest.openCursor([search]);
    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
          console.table(cursor.value)
        }
          cursor.clear();
    }
  }
}
