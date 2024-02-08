import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cat } from '../model/cat';

@Injectable({
  providedIn: 'root'
})
export class CatsService {
  url = "http://localhost:3030/cats/"

  constructor(private http: HttpClient) { }

  getCats(): Observable<any> {
    return this.http.get(this.url)
  }

  createCat(cat: Cat): Observable<any> {
    return this.http.post(this.url, cat)
  }

  updateCat(id: String, cat: Cat): Observable<any> {
    return this.http.put(this.url + id, cat)
  }

  deleteCat(id: String): Observable<any> {
    return this.http.delete(this.url + id)
  }

  getCat(id: String): Observable<any> {
    return this.http.get(this.url + id)
  }
}
