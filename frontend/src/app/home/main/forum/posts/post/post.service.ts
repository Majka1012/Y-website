import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { postInterface } from '../post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) {}

  createPost(post: postInterface): Observable<postInterface> {
    return this.http.post<postInterface>(this.apiUrl, post);
  }

  getPosts(): Observable<postInterface[]> {
    return this.http.get<postInterface[]>(this.apiUrl);
  }
}
