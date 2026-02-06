import { Component, input } from '@angular/core';
import { postInterface } from './post.model';
import { Post } from './post/post';
@Component({
  selector: 'app-posts',
  imports: [Post],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {
  posts = input<postInterface[]>();
}
