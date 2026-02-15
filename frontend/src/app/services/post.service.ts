import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { postInterface } from '../models/post.model';
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
  toggleLike(postId: string, liked: boolean): Observable<postInterface> {
    return this.http.patch<postInterface>(`${this.apiUrl}/${postId}/like`, {
      liked,
    });
  }
  getUserPosts(userHandle: string): Observable<postInterface[]> {
    return this.http.get<postInterface[]>(`${this.apiUrl}/userPosts`, {
      params: { handle: userHandle },
    });
  }
}
