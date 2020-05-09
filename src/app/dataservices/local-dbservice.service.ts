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

  getFromIndex(indexName: string, storename: string, mode: string) {
    const tx = this.db.transaction(storename, mode)
    const store = tx.objectStore(storename)
    const index = store.index(indexName)
    return index;
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

  getPasswordByID(search: string): string {
    
    let passwordfromid = ''

    let index = this.getFromIndex('id', 'passwordlist', 'readwrite');
    
    let request = index.get(IDBKeyRange.only(search));
    request.onsuccess = () => {
      console.log(request.result.password)
      passwordfromid = request.result.password
    }
    return passwordfromid
  }


  getAllPasswords(): string[] {
    
    let passwordlist = []

    let index = this.getFromIndex('password', 'passwordlist', 'readwrite');
    
    let request = index.openCursor();
    request.onsuccess = () => {
      var cursor = request.result;
      if (cursor) {
        passwordlist.push({id: cursor.value.id, domain: cursor.value.domain, password: cursor.value.password, updatetime: cursor.value.updatetime});
        cursor.continue();
      }
    }
    return passwordlist
  }

  checkPassword(search: string): string[] {

    let passwordlist = []

    let index = this.getFromIndex('password', 'passwordlist', 'readwrite');
    
    let request = index.openCursor(IDBKeyRange.only(search));
    request.onsuccess = () => {
      var cursor = request.result;
      if (cursor) {
        passwordlist.push({id: cursor.value.id, domain: cursor.value.domain, password: cursor.value.password, updatetime: cursor.value.updatetime});
        cursor.continue();
      }
    }
    return passwordlist
  }
}
