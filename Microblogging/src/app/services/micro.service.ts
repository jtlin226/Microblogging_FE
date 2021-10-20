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

  /**
   * backend url endpoint for service calls
   */
  url = "http://localhost:8082/micro";

  /**
   * http header to pass in jwt for authorization
   */
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": ""
    })
  };

  /**
   * Get all micros of current user logged in and other users followed
   * @returns get method call to the back end
   */
  getMicros(): Observable<Micro[]>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);
    return this.http.get<Micro[]>(this.url, this.httpOptions)
  }

  /**
   * call a post method to the backend with jwt of current user and
   * new content for a micro to be persisted in the backend
   * @param currentUser the current user logged in
   * @param newContent the content of the new micro(post) to be created
   * @returns a post method call to the backend with newMicro object
   */
  createMicro(currentUser: User, newContent: string): Observable<Micro> {
    let newMicro = {
      id: 0,
      content: newContent,
      user: currentUser.id
    }
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);

    return this.http.post<Micro>(this.url, newMicro, this.httpOptions)
  }
}
