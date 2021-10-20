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

  /**
   * Get an array of Users that follow the current user.
   * @returns Observable with an array of the current user's followers
   */
  public getFollowers(): Observable<User[]>{
    this.setHeaderWithJwt();
    return this.http.get<User[]>(`${this.url}/follower`, this.httpOptions);
  }

  /**
   * Get an array of Users that the current user follows.
   * @returns Observable with an array of the users that the current user follows
   */
  public getFollowing(): Observable<User[]>{
    this.setHeaderWithJwt();
    return this.http.get<User[]>(`${this.url}/following`, this.httpOptions);
  }

  /**
   * Adds a new user to the current user's following list.
   * @param user the User to be followed
   * @returns Observable of the current user
   */
  public followUser(user: User): Observable<User>{
    this.setHeaderWithJwt();
    return this.http.put<User>(`${this.url}/follow/${user.id}`, {}, this.httpOptions);
  }

  /**
   * Removes a user from the current user's following list.
   * @param user the User to be unfollowed
   * @returns Observable of the current user
   */
  public unFollowUser(user: User): Observable<User>{
    this.setHeaderWithJwt();
    return this.http.put<User>(`${this.url}/unfollow/${user.id}`, {}, this.httpOptions);
  }

  /**
   * Searches for users based on their username. The API method this calls will pattern match
   * and return a list of users.
   * @param username the string to search on
   * @returns Observable with an array of Users found by the search
   */
  public searchByUsername(username: string): Observable<User[]>{
    this.setHeaderWithJwt();
    return this.http.get<User[]>(`${this.url}/${username}`, this.httpOptions);
  }

  /**
   * Searches for users based on their name. The API method this calls will pattern match
   * and return a list of users.
   * @param name the string to search on
   * @returns Observable with an array of Users found by the search
   */
  public searchByName(name: string): Observable<User[]>{
    this.setHeaderWithJwt();
    return this.http.get<User[]>(`${this.url}/search/${name}`, this.httpOptions);
  }

  /**
   * Gets the current user as a User object
   * @returns Observable with the current user
   */
  public getCurrentUser(): Observable<User>{
    this.setHeaderWithJwt();
    return this.http.get<User>(this.url, this.httpOptions);
  }

  /**
   * Checks to see if a User is being followed by the current user.
   * @param user the user to be checked
   * @param following an array of the current user's follows
   * @returns true if the given user is in the given array of followed Users
   */
  public isUserFollowed(user: User, following: User[]): boolean{
    return following.some( u =>  u.id === user.id );
  }

  /**
   * Set the header with an Authorization property that has the value of Bearer {currentJWT}.
   * This method needs to be called to be able to perform most API calls after login.
   */
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

  resetPassword(password: string)
  {
    this.setHeaderWithJwt();
    let obj = {
      password: password
    }
    return this.http.put<User>(`${this.url}/password`, obj, this.httpOptions);
  }

  getSpecificUser(username: string): Observable<User>
  {
    return this.http.get<User>(`${this.url}/recover/${username}`)
  }
}
