import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';

import { Sail } from 'src/app/models/sail';
import { Board } from '../models/board';
import { NONE_TYPE } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class CRUDServiceService {

  constructor(private http: HttpClient) {
  }

  localUrl = 'assets/temporaryDB/';
  onlineUrl = 'http://127.0.0.1:8000/'; //'http://simonnaish.pythonanywhere.com/'  // 


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  //get today date YYYY-MM-DD
  getToday() {
    let date = new Date();
    return [date.getFullYear(), date.getUTCMonth() + 1, date.getUTCDate()].join('-');
  }

  //Read for ALL, Update, Delete, for Sails and Boards

  //Get full list
  loadMaterial(apiUrl: string): any {
    return this.http.get<any[]>(this.onlineUrl + apiUrl)
    // .pipe(tap(
      // data => console.log(apiUrl + ': ' + data),
      // error => console.log(error)
    // ))
  }
  //Read single item by id
  getItem(apiUrl: string, id: string): any {
    return this.http.get<any>(this.onlineUrl + apiUrl + id).pipe(tap(
      data => console.log(data),
      error => console.log(error)
    ))
  }
  //Create item
  addItem(apiUrl: string, id: string) {
    return this.http.post<any>(this.onlineUrl + apiUrl, { 'id': id }).subscribe(
      () => console.log('done'),
      error => console.log(error)
    )
  }

  //Update item/whenGone=date & repair=true
  repairItem(apiUrl: string, id: string): any {

    return this.http.patch<any>(this.onlineUrl + apiUrl + id + '/', { 'id': id.toString(), 'repair': true, "whenGone": this.getToday() }).subscribe(() => console.log(id + ' sent to repair'),
      error => console.log(error))
  }

  //Update item/whenSold=date & sold=true
  sellItem(apiUrl: string, id: string): any {
    return this.http.patch(this.onlineUrl + apiUrl + id + '/', { 'sold': true, 'whenSold': this.getToday() }).subscribe(() => console.log(id + ' sold'),
      error => console.log(error))
  }

  //Update utem/whenCame=date & sold=false & repair=false 
  recieveUsedItem(apiUrl: string, id: string): any {
    return this.http.patch<any>(this.onlineUrl + apiUrl + id + '/', { 'whenCame': this.getToday(), 'sold': false, 'repair': false }).subscribe(() => console.log(id + ' back from repair'),
      error => console.log(error))
  }

 
//Create,delete for beginner material and accessories

// Create for beginners
  addItemWithDetails(apiUrl:string, type:string, model:string, size:string|number){
    return this.http.post<any>(this.onlineUrl+apiUrl, {'type':type, 'model':model, 'size':size}).subscribe( 
      ()=>console.log('Success'),
      error=>console.log(error)
    )
  }

  //delete for beginners
  deleteItem(apiUrl){
    return this.http.delete(this.onlineUrl+apiUrl).subscribe(
      ()=>console.log('deleted'),
      error=>console.log(error)
    );
  }


  //send report 
  sendReport(fromDate?, tillDate?){
    if (fromDate){
      return this.http.post<any>(this.onlineUrl+'report/', {'from_date':fromDate, 'till_date':tillDate}).subscribe(
        ()=>console.log('correct'+fromDate+' '+tillDate),
        error=>console.log(error)
      );
    }else{
      return this.http.get<any>(this.onlineUrl+'report/').subscribe(
        ()=>console.log('correct'),
        error=>console.log(error)
      );
    }
    
  }

  //test
  loadTest(): any {
    return this.http.get<any>('http://127.0.0.1:8000/boards/').pipe(tap(
      data => console.log(data),
      error => console.log(error)
    ))
  }
}
