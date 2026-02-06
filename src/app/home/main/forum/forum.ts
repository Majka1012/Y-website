import { Component } from '@angular/core';
import { Posts } from './posts/posts';
import { PostInput } from './post-input/post-input';
@Component({
  selector: 'app-forum',
  imports: [Posts, PostInput],
  templateUrl: './forum.html',
  styleUrl: './forum.css',
})
export class Forum {
  posts?: string[];
  addingPost(text: string) {
    if (!this.posts) {
      this.posts = [text];
    } else {
      this.posts.push(text);
    }
    console.log(this.posts);
  }
}
