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

  constructor() {
    console.table(this.openIndexedDB())
  };

  openIndexedDB(): <IDBOpenDBRequest> {

    let db = indexedDB.open('WBBPasswordManager', 2);

    db.onsuccess = (event) => {
      let db = {}
      db['result'] = event.target['result']
      console.table(db['result'])
      return db;
    }

    db.onerror = (event) => {
      let db = {}
      db['result'] = event.target['result']
      console.table(db['result'])
      return db;
    }

    db.onblocked = (event) => {
      let db = {}
      db['result'] = event.target['result']
      console.table(db['result'])
      return db;
    }

    db.onupgradeneeded = (event) => {
      console.table(JSON.stringify(event))
      let db = {}
      db['result'] = event.target['result'];

      db['store'] = db['result'].createObjectStore('passwordlist', { keyPath: 'id', autoIncrement:true });
      db['store'].createIndex('id', 'id', { unique: true});
      db['store'].createIndex('domain', 'domain', { unique: false });
      db['store'].createIndex('password', 'password', { unique: false });
      db['store'].createIndex('updatetime', 'updatetime', { unique: false });
      return db;
    }

  }

  getStoreIndexedDB(indexName: string, storename: string, mode: string) {
    let db = {};
    db['result'] = this.openIndexedDB['result'];
    db['tx'] = db['result'].transaction(storename, mode);
    db['store'] = db['tx'].objectStore(storename);
    db['index'] = db['store'].index(indexName);
  
    return db;
  }

  getStoreInDB (storename: string, mode: string) {
    let db = {};
    db['result'] = this.openIndexedDB['result'];
    db['tx'] = db['result'].transaction(storename, mode);
    db['store'] = db['tx'].objectStore(storename);
  
    return db['store'];
  }
  

  addPassword(passwordtoadd: PasswordRecord) {

    let openDB = this.openIndexedDB();

    openDB.onsuccess = () => {
  
      let objectStoreRequest = openDB.store.put({domain:passwordtoadd.domain,password: passwordtoadd.pw,
        updatetime: passwordtoadd.updatedate})
  
      objectStoreRequest.onsuccess = (event) => {
        console.log(event.target.result)
      }
    }
  
    return true;
    
  }

}
