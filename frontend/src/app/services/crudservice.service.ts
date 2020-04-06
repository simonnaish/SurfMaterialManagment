import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Sail } from 'src/app/models/sail';
import { Board } from '../models/board';
import { getLocaleFirstDayOfWeek } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class CRUDServiceService {

  constructor(private http: HttpClient) {
  }

  localUrl = 'assets/temporaryDB/';
  onlineUrl = 'http://127.0.0.1:8000/';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      fromString: "_page=1&_limit=1",
      'Access-Control-Allow-Origin': '*'
    })
  }

  //get today date YYYY-MM-DD
  getToday(){
    let date=new Date();
    return [date.getFullYear(), date.getUTCMonth()+1, date.getUTCDate()].join('-');
  }

  loadMaterial(apiUrl: string): any {
    return this.http.get<any[]>(this.onlineUrl + apiUrl).pipe(tap(
      data => console.log(apiUrl + ': ' + data),
      error => console.log(error)
    ))
  }

  getItem(apiUrl: string, id: string): any {
    return this.http.get<any>(this.onlineUrl + apiUrl + id).pipe(tap(
      data => console.log(data),
      error => console.log(error)
    ))
  }

  addItem(apiUrl: string, id: string): any {
    return this.http.post<any>(this.onlineUrl + apiUrl, { 'id': id }).subscribe(() => console.log(id + ' added to ' + apiUrl))
  }

  repairItem(apiUrl: string, id: string): any {
  
    return this.http.patch<any>(this.onlineUrl + apiUrl + id+'/', {'id':id.toString(), 'repair': true, "whenGone": this.getToday() }).subscribe(() => console.log(id + ' sent to repair'),
      error => console.log(error))
  }
  
  recieveUsedItem(apiUrl:string, id:string):any{
    return this.http.patch<any>(this.onlineUrl+apiUrl+id+'/', {'whenCame':this.getToday(),'sold':false, 'repair':false}).subscribe(()=>console.log(id+' back from repair'),
    error=>console.log(error))
  }

  sellItem(apiUrl:string, id:string):any{
    return this.http.patch(this.onlineUrl+apiUrl+id+'/', {'sold':true, 'whenSold':this.getToday()}).subscribe(()=>console.log(id+' sold'),
    error=>console.log(error))
  }


  //  loadSails():any{
  //   return this.http.get<Sail[]>(this.onlineUrl+'sails/').pipe(tap(
  //     data=>console.log('loadSails:'+data),
  //     error=>console.log(error)
  //   ));
  // }

  // getSail(id: string): any {
  //   return this.http.get<Sail>(this.onlineUrl+'sails/'+id);

  //  }

  // addSail(sail:string){
  //   return this.http.post<Sail>(this.onlineUrl+'sails/', sail);
  // }

  // loadBoards(): Observable<Board[]> {
  //   return this.http.get<Board[]>(this.localUrl + 'boards.json', this.httpOptions).pipe(tap(
  //     data => console.log("Boards loaded"),
  //     error => console.log(error)
  //   ));
  // }
  // loadBoards():any{
  //   return this.http.get<Board[]>(this.onlineUrl+'boards/').pipe(tap(
  //     data=>console.log(data),
  //     error=>console.log(error)
  //   ))
  // }

  // getBoard(id:string):any{
  //   return this.http.get<Board>(this.onlineUrl+'boards/'+id);
  // }

  // addBoard(board:string){
  //   return this.http.post<Board>(this.onlineUrl+'boards/', board);
  // }



  loadBeginners(): Observable<any[]> {
    return this.http.get<any[]>(this.localUrl + 'beginners.json', this.httpOptions).pipe(tap(
      data => console.log("Beginner material loaded"),
      error => console.log(error)
    ));

  }

  loadAccessories(): Observable<any[]> {
    return this.http.get<any[]>(this.localUrl + 'accessories.json', this.httpOptions).pipe(tap(
      data => console.log('Accessories loaded'),
      error => console.log(error)
    ));
  }

  updateAccessories(object: any) {

  }


  //test
  loadTest(): any {
    return this.http.get<any>('http://127.0.0.1:8000/boards/').pipe(tap(
      data => console.log(data),
      error => console.log(error)
    ))
  }
}
