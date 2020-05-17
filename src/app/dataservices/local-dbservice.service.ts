import { Injectable } from '@angular/core';
import { PasswordRecord } from '../models/password-record';

@Injectable({
  providedIn: 'root'
})
export class LocalDBserviceService {

  constructor() { 
     this.openIndexedDB()
  }

  openIndexedDB = () => {

    let openDB = indexedDB.open('WBBPasswordManager', 2)

    openDB.onsuccess = (event) => {
      let db = {}
      db['result'] = openDB.result
      return db;
    }

    openDB.onerror = (event) => {
      let db = {}
      db['result'] = event.target['result']
      return openDB.result;
    }

    openDB.onblocked = (event) => {
      let db = {}
      db['result'] = event.target['result']
      return openDB.result;
    }

    openDB.onupgradeneeded = (event) => {
      let db = {}
      db['result'] = event.target['result'];

      db['store'] = db['result'].createObjectStore('passwordlist', { keyPath: 'id', autoIncrement:true });
      db['store'].createIndex('id', 'id', { unique: true});
      db['store'].createIndex('domain', 'domain', { unique: false });
      db['store'].createIndex('password', 'password', { unique: false });
      db['store'].createIndex('updatetime', 'updatetime', { unique: false });
      return openDB.result;
    }

  }

  addPassword(passwordtoadd: PasswordRecord) {

    let openDB = indexedDB.open('WBBPasswordManager', 2)

    openDB.onsuccess = (event) => {
      let db = {}
      db['result'] = openDB.result;
      db['store'] = db['result'].transaction(['passwordlist'],'readwrite').objectStore('passwordlist');
      db['store'].put({domain: passwordtoadd.site, password: passwordtoadd.password, updatetime: passwordtoadd.updatedate})
      
      return openDB.result;
    }

    openDB.onerror = (event) => {
      console.warn(event)
      return openDB.result;
    }

    openDB.onupgradeneeded = (event) => {
      let db = {}
      db['result'] = event.target['result'];

      db['store'] = db['result'].createObjectStore('passwordlist', { keyPath: 'id', autoIncrement:true });
      db['store'].createIndex('id', 'id', { unique: true});
      db['store'].createIndex('domain', 'domain', { unique: false });
      db['store'].createIndex('password', 'password', { unique: false });
      db['store'].createIndex('updatetime', 'updatetime', { unique: false });
      db['store'].put({domain: passwordtoadd.site, password: passwordtoadd.password, updatetime: passwordtoadd.updatedate})
      return openDB.result;
    }
  }

  getAllPasswords(): Array<string> {
    
    let searchResults = []

    let openDB = indexedDB.open('WBBPasswordManager', 2)

    openDB.onsuccess = (event) => {
      let db = {}
      db['result'] = event.target['result'];
      db['store'] = db['result'].transaction('passwordlist','readwrite').objectStore('passwordlist');
      
      let index = db['store'].index('domain');
      let getAllRequest = index.getAll();
      getAllRequest.onsuccess = () => {
        for (let item in getAllRequest.result) {
           searchResults.push(getAllRequest.result[item]);
        }
      }
    }
    return searchResults
  }

  checkPassword(search: string): string[] {

    let searchResults = []

    let openDB = indexedDB.open('WBBPasswordManager', 2)

    openDB.onsuccess = (event) => {
      let db = {}
      db['result'] = event.target['result'];
      db['store'] = db['result'].transaction('passwordlist','readwrite').objectStore('passwordlist');
      
      let index = db['store'].index('password');

      let request = index.openCursor(IDBKeyRange.only(search));
      request.onsuccess = () => {
      var cursor = request.result;
      if (cursor) {
          
        }
        searchResults.push({id: cursor.value.id, domain: cursor.value.domain, password: cursor.value.password, updatetime: cursor.value.updatetime});
        cursor.continue();
      }
    }
    return searchResults
  }

}
