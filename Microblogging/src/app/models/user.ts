import { Injectable } from '@angular/core';
// import { Adapter } from './adapter';

export class User {
    constructor(
    public id: number,
    public username: string,
    ){}
}

@Injectable({
    providedIn: 'root',
  })
export class UserAdapter {
    /**
     * Converts DTO into User object.
     * @param revUser: DTO of User.
     * @returns User
     */
    adapt(revUser:any):User{
        return new User(
            revUser.id,
            revUser.username
        )
    }
}