import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'
import { AuthorizationService } from './authorization.service';
// import { environment } from 'src/environments/environment';
// import { UserAdapter } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  constructor(private http: HttpClient, private authService: AuthorizationService) { }

  // url: string = `${environment.revAssureBase}revuser`;
  url = "http://localhost:8082/user";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": ""
    })
  };

  /**
   * Performs a POST to "/revuser/register" to register a new user to database.
   * @param newUser User to be registered and persisted.
   * @returns Observable of User returned from backend.
   */
  // registerNewUser(newUser: User): Observable<User> {
  //   return this.http.post<User>(`${this.url}/register`, newUser).pipe(map((result: any) => {
  //     let registeredUser: User = this.userAdapter.adapt(result);
  //     return registeredUser;
  //   }));
  // }

  registerNewUser(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, newUser);
  }

  /**
   * Performs a POST to "/revuser/authenticate" to login.
   * After successful login, also calls getUser().
   * @param username 
   * @param password 
   * @returns Observable of the user's JWT as a string.
   */
  login(username: string, password: string): Observable<any> {
    const authObject = {
      username,
      password
    }
    return this.http.post(`${this.url}/authenticate`, authObject)
  }

  public getFollowers(): Observable<User[]>{
    this.setHeaderWithJwt();
    return this.http.get<User[]>(`${this.url}/follower`, this.httpOptions);
  }

  public getFollowing(): Observable<User[]>{
    this.setHeaderWithJwt();
    return this.http.get<User[]>(`${this.url}/following`, this.httpOptions);
  }

  public followUser(user: User): Observable<User>{
    this.setHeaderWithJwt();
    return this.http.put<User>(`${this.url}/follow/${user.id}`, {}, this.httpOptions);
  }

  public unFollowUser(user: User): Observable<User>{
    this.setHeaderWithJwt();
    return this.http.put<User>(`${this.url}/unfollow/${user.id}`, {}, this.httpOptions);
  }

  public searchByUsername(username: string): Observable<User[]>{
    this.setHeaderWithJwt();
    return this.http.get<User[]>(`${this.url}/${username}`, this.httpOptions);
  }

  public searchByName(name: string): Observable<User[]>{
    this.setHeaderWithJwt();
    return this.http.get<User[]>(`${this.url}/search/${name}`, this.httpOptions);
  }

  public getCurrentUser(): Observable<User>{
    this.setHeaderWithJwt();
    return this.http.get<User>(this.url, this.httpOptions);
  }

  public isUserFollowed(user: User, following: User[]): boolean{
    return following.some( u =>  u.id === user.id );
  }

  private setHeaderWithJwt(){
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);
  }

  updateUser(updatedUser : any): Observable<User> {
    this.setHeaderWithJwt();
    let obj = {
      id: updatedUser.id,
      username: updatedUser.username,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      imageURL: updatedUser.imageURL,
      about: updatedUser.about,
      password: ''
    }
    return this.http.put<User>(`${this.url}/about`, obj, this.httpOptions)
  }

  /**
   * send request to change user password
   * @param password new password
   * @returns observable of updated user
   */
  resetPassword(password: string)
  {
    this.setHeaderWithJwt();
    let obj = {
      password: password
    }
    return this.http.put<User>(`${this.url}/password`, obj, this.httpOptions);
  }

  /**
   * send request to get specific user
   * @param username username to recover
   * @returns observable of user we're looking for
   */
  getSpecificUser(username: string): Observable<User>
  {
    return this.http.get<User>(`${this.url}/recover/${username}`)
  }
}
