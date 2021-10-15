import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Micro } from '../models/micro';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class MicroService {

  constructor(private http: HttpClient, private authService: AuthorizationService) { }

  url = "http://localhost:8082/micro";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": ""
    })
  };

  getMicros(): Observable<Micro[]>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);
    console.log(this.authService.jwt)
    console.log("before returning...")
    return this.http.get<Micro[]>(this.url, this.httpOptions)
  }

}
