import { Component, ViewChild } from '@angular/core';
import { Posts } from './posts/posts';
import { PostInput } from './post-input/post-input';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [Posts, PostInput],
  templateUrl: './forum.html',
  styleUrl: './forum.css',
})
export class Forum {
  @ViewChild('posts') postsComponent!: Posts;

  refreshPosts() {
    this.postsComponent.loadPosts();
  }
}
