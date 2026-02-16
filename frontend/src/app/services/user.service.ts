import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userInterface } from '../models/user.model';
import { UserInfo } from '../models/userInfo.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<userInterface[]> {
    return this.http.get<userInterface[]>(this.apiUrl);
  }
  getUser(userHandle: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.apiUrl}/user`, {
      params: { userHandle: userHandle },
    });
  }
}
