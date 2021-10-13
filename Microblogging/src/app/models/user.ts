import { Injectable } from '@angular/core';
// import { Adapter } from './adapter';

export class User {
    constructor(
    public id: number,
    public username: string,
    public firstName: string,
    public lastName: string,
    public imageURL: string,
    public about: string,
    ){}
}

// @Injectable({
//     providedIn: 'root',
//   })
// export class UserAdapter {
//     /**
//      * Converts DTO into User object.
//      * @param microUser: DTO of User.
//      * @returns User
//      */
//     adapt(microUser:any):User{
//         return new User(
//             microUser.id,
//             microUser.username,
//             microUser.firstname,
//             microUser.lastname,
//             microUser.image,
//             microUser.about,
//         )
//     }
// }