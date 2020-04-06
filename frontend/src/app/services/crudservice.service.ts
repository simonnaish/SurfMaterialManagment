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
  onlineUrl= 'http://127.0.0.1:8000/';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      fromString: "_page=1&_limit=1",
      'Access-Control-Allow-Origin': '*'
    })
  }

  //send list of avaible sails.  
  //TODO: get it from backend 
  loadSails(): Observable<Sail[]> {

    return this.http.get<Sail[]>(this.localUrl + 'sails.json', this.httpOptions).pipe(tap(
      data => console.log("Sails loaded"),
      error => console.log(error)
    ));
 }

 loadSails2():any{
//   let secondList:Sail;
// this.http.get('http://127.0.0.1:8000/boards/').subscribe((data:Sail)=>secondList={
//   id:data['serial'],
//   type:data['type'],
//   category:data['category'],
//   model:data['model'],
//   size:data['size'],
//   year:data['year'],
//   whenCame:data['whenCame'],
//   whenGone:data['whenGone'],
//   whenSold:data['whenSold'],
//   repair:data['repair'],
//   sold:data['sold'],
//  });
// console.log(secondList);
//   return secondList;
  return this.http.get<Sail[]>('http://127.0.0.1:8000/sails/').pipe(tap(
    data=>console.log('loadSails2:'+data),
    error=>console.log(error)
  ));
}

/*
  this.http.get<any[]>('http://127.0.0.1:8000/boards/').pipe(tap(
    data=>console.log(data),

    error=>console.log(error)
  ));
  
  */


  loadBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.localUrl + 'boards.json', this.httpOptions).pipe(tap(
      data => console.log("Boards loaded"),
      error => console.log(error)
    ));
  }
  loadBoards2():any{
    return this.http.get<Board[]>(this.onlineUrl+'boards').pipe(tap(
      data=>console.log(data),
      error=>console.log(error)
    ))
  }

  getBoard(id:string):any{
    return this.http.get<Board>(this.onlineUrl+'boards/'+id);
  }

  addBoard(board:string){
    return this.http.post<Board>(this.onlineUrl+'boards/', board);
  }

  getSail(id: string): any {
   return this.http.get<Sail>(this.onlineUrl+'sails/'+id);
    
  }

  loadBeginners(): Observable<any[]> {
    return this.http.get<any[]>(this.localUrl + 'beginners.json', this.httpOptions).pipe(tap(
      data => console.log("Beginner material loaded"),
      error => console.log(error)
    ));
    
  }

  loadAccessories():Observable<any[]>{
    return this.http.get<any[]>(this.localUrl+'accessories.json', this.httpOptions).pipe(tap(
      data=>console.log('Accessories loaded'),
      error=>console.log(error)
      ));
  }

  updateAccessories(object:any){

  }

  addSail(sail:Sail){
    return this.http.post(this.onlineUrl+`boards/${sail.id}`, sail);
  }


  //test
  loadTest():any{
    return this.http.get<any>('http://127.0.0.1:8000/boards/').pipe(tap(
      data=>console.log(data),
      error=>console.log(error)
    ))
  }
}
