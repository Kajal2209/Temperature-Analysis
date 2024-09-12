import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataSubject = new BehaviorSubject<
    { temperature: string; datetime: string }[]
  >([]);
  data$ = this.dataSubject.asObservable();

  addData(entry: { temperature: string; datetime: string }) {
    const currentData = this.dataSubject.value;
    this.dataSubject.next([...currentData, entry]);
  }
}
