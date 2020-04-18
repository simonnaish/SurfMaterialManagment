import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { active } from '../app.component'


@Injectable({
  providedIn: 'root'
})
export class CRUDServiceService {

  constructor(private http: HttpClient) {
  }

  localUrl = 'assets/temporaryDB/';
  onlineUrl = 'http://127.0.0.1:8000/'  // 'https://simonnaish.pythonanywhere.com/'  // 


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Token 0e049d875a0e5beb3645bc8b11f0bcbfeab3f852',
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
    if(active){
    return this.http.post<any>(this.onlineUrl + apiUrl, { 'id': id }, this.httpOptions).subscribe(
      () => console.log('done'),
      error => console.log(error)
    )
    }else{
      alert('You must log in first.')
    }
  }

  //Update item/whenGone=date & repair=true
  repairItem(apiUrl: string, id: string): any {
    if(active){
    return this.http.patch<any>(this.onlineUrl + apiUrl + id + '/', { 'id': id.toString(), 'repair': true, "whenGone": this.getToday() }, this.httpOptions).subscribe(() => console.log(id + ' sent to repair'),
      error => console.log(error))
    }else{
      alert('You must log in first.')
    }
    
  }

  //Update item/whenSold=date & sold=true
  sellItem(apiUrl: string, id: string): any {
    if(active){
      return this.http.patch(this.onlineUrl + apiUrl + id + '/', { 'sold': true, 'whenSold': this.getToday() }, this.httpOptions).subscribe(() => console.log(id + ' sold'),
      error => console.log(error))
    }else{
      alert('You must log in first.')
    }
  }

  //Update utem/whenCame=date & sold=false & repair=false 
  recieveUsedItem(apiUrl: string, id: string): any {
    if(active){return this.http.patch<any>(this.onlineUrl + apiUrl + id + '/', { 'whenCame': this.getToday(), 'sold': false, 'repair': false }, this.httpOptions).subscribe(() => console.log(id + ' back from repair'),
      error => console.log(error))
  }else{
    alert('You must log in first.')
  }
  }


  //Create,delete for beginner material and accessories

  // Create for beginners
  addItemWithDetails(apiUrl: string, type: string, model: string, size: string | number) {
    if(active){return this.http.post<any>(this.onlineUrl + apiUrl, { 'type': type, 'model': model, 'size': size }, this.httpOptions).subscribe(
      () => console.log('Success'),
      error => console.log(error)
    )
    }else{
      alert('You must log in first.')
    }
  }

  //delete for beginners
  deleteItem(apiUrl) {
    if(active){return this.http.delete(this.onlineUrl + apiUrl).subscribe(
      () => console.log('deleted'),
      error => console.log(error)
    );
    }else{
      alert('You must log in first.')
    }
  }


  //send report 
  sendReport(whatMaterial, fromDate?, tillDate?) {
    if(active){if (fromDate) {
      return this.http.post<any>(this.onlineUrl + 'report/', { 'what_material': whatMaterial, 'from_date': fromDate, 'till_date': tillDate }, this.httpOptions).subscribe(
        () => console.log('correct' + fromDate + ' ' + tillDate),
        error => console.log(error)
      );
    } else {
      return this.http.post<any>(this.onlineUrl + 'report/', { 'what_material': whatMaterial }, this.httpOptions).subscribe(
        () => console.log('correct'),
        error => console.log(error)
      );
    }
  }else{
    alert('You must log in first.')
  }

  }

  //get last movements
  loadRecentlyReceived() {
    return this.http.get<any>(this.onlineUrl + 'received')

  }
  loadRecentlyGone() {
    return this.http.get<any>(this.onlineUrl + 'gone')
  }



}
