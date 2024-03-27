import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenFoodFactsService {
  constructor(private http: HttpClient) { }

  fetchData(): Observable<any> {
    return this.http.get<any>('https://world.openfoodfacts.org/');
  }
}
