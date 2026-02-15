import { Component, inject } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-user-posts',
  imports: [],
  templateUrl: './user-posts.html',
  styleUrl: './user-posts.css',
})
export class UserPosts {
  constructor(private postService: PostService) {}
}
