import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { convertToObject } from 'typescript';
import { Micro } from '../models/micro';
import { User } from '../models/user';
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

  convertToDto(user: User, content: string) {
    let dto = {
      id: 0,
      content: content,
      user: user
    }
    return dto;
  }

  getMicros(): Observable<Micro[]>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);
    return this.http.get<Micro[]>(this.url, this.httpOptions)
  }

  createMicro(currentUser: User, newContent: string): Observable<Micro> {
    let newMicro = {
      id: 0,
      content: newContent,
      user: currentUser.id
    }
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);

    return this.http.post<Micro>(this.url, newMicro, this.httpOptions)
  }

  // createMicro(currentUser: User, newContent: string): Observable<Micro>{
  //   let newMicro: Micro = new Micro(0, newContent, currentUser);
  //   this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);
  //   console.log(newMicro);
  //   return this.http.post<Micro>(this.url, newMicro, this.httpOptions)
  // }
}
