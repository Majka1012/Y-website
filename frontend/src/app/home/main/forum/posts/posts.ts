import { Component, input, output } from '@angular/core';
import { Post } from './post/post';

@Component({
  selector: 'app-posts',
  imports: [Post],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {
  posts = input<any[]>([]);
}
