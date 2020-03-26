import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { IPasswordRecord } from '../models/ipassword-record';

@Injectable({
  providedIn: 'root'
})
export class LocalDBserviceService extends Dexie {
  
  public PWRecords!: Dexie.Table<IPasswordRecord, number>;

  constructor() {  
    super("WBBPWManager");
    
    this.version(1).stores({
      PWRecords: '++id, domain, password, updatedate',
    });
  }
}
