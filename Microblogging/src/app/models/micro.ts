import { Injectable } from '@angular/core';
import { User } from './user';
// import { Adapter } from './adapter';

export class Micro {
    constructor(
    public id: number,
    public content: string,
    public user: User
    ){}
}