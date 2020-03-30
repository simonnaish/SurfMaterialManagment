import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Sail } from 'src/app/models/sail';
import { Board } from '../models/board';


@Injectable({
  providedIn: 'root'
})
export class CRUDServiceService {

  constructor(private http: HttpClient) {
  }

  localUrl = 'assets/temporaryDB/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      fromString: "_page=1&_limit=1"
    })
  }

  //send list of avaible sails.  
  //TODO: get it from backend 
  loadSails(): Observable<Sail[]> {

    return this.http.get<Sail[]>(this.localUrl + 'sails.json', this.httpOptions).pipe(tap(
      data => console.log("Correct"),
      error => console.log(error)
    ));
  }

  loadBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.localUrl + 'boards.json', this.httpOptions).pipe(tap(
      data => console.log("Correct"),
      error => console.log(error)
    ));
  }


  //404 forever... WHF?
  getSail(id: string): Observable<Sail> {
    const url = `${this.localUrl}sails.json/${id}`;
    return this.http.get<Sail>(url, this.httpOptions).pipe(tap(
      data => console.log(data),
      error => console.log(error)
    ));
  }

  getBeginners(): Observable<any[]> {
    return this.http.get<any[]>(this.localUrl + 'beginners.json', this.httpOptions).pipe(tap(
      data => console.log("Correct"),
      error => console.log(error)
    ));
  }
}
