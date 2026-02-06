import { Component } from '@angular/core';
import { Posts } from './posts/posts';
import { PostInput } from './post-input/post-input';
import { postInterface } from './posts/post.model';
@Component({
  selector: 'app-forum',
  imports: [Posts, PostInput],
  templateUrl: './forum.html',
  styleUrl: './forum.css',
})
export class Forum {
  newPosts?: postInterface[];
  addingPost(post: postInterface) {
    if (!this.newPosts) {
      this.newPosts = [post];
    } else {
      this.newPosts.push(post);
    }
    // console.log(this.newPost);
  }
}
