import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {


  public _subject = new BehaviorSubject<any>('');

  emitt<T>(data:T)
  {
    console.log(data)
    this._subject.next(data);
  }
  onn<T>():Observable<T>{
       return this._subject.asObservable();
  }
  
}

