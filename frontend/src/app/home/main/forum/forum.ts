import { Component } from '@angular/core';
import { Posts } from './posts/posts';
import { PostInput } from './post-input/post-input';
import { PostService } from '../../../services/post.service';
import { postInterface } from '../../../models/post.model';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [Posts, PostInput],
  templateUrl: './forum.html',
  styleUrl: './forum.css',
})
export class Forum {
  posts: postInterface[] = [];

  constructor(private postService: PostService) {}
  ngOnInit() {
    this.loadPosts();
  }
  loadPosts() {
    this.postService.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  onPostAdded() {
    this.loadPosts();
  }
}
