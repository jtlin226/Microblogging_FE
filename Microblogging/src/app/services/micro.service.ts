import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { convertToObject } from 'typescript';
import { Micro } from '../models/micro';
import { AuthorizationService } from './authorization.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MicroService {

  constructor(private http: HttpClient, private authService: AuthorizationService, private userService: UserService) { }

  url = "http://localhost:8082/micro";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": ""
    })
  };

  convertToDto(content: string) {
    let dto = {
      id: 0,
      content: content,
      user: this.userService.getUserId()
    }
    return dto;
  }

  getMicros(): Observable<Micro[]>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);
    console.log(this.authService.jwt)
    console.log("before returning...")
    return this.http.get<Micro[]>(this.url, this.httpOptions)
  }

<<<<<<< HEAD
  createMicro(newContent: string) {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);
    console.log("Converting to DTO...");
    const dto = this.convertToDto(newContent);
    console.log(dto);
    return this.http.post<Micro>(this.url, dto, this.httpOptions)
  }
=======
  // createMicro(newMicro: Micro): Observable<Micro>{
  //   this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);
  //   return this.http.post<Micro>(this.url, newMicro, this.httpOptions);
  // }
>>>>>>> main
}
