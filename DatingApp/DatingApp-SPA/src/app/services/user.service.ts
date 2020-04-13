import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    console.log('Hitted');
    return this.http.get<User[]>(this.baseUrl + 'users');
  }
  getUser(id: any): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }
}
