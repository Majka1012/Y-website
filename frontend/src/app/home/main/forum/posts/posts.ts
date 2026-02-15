import { Component, input, output } from '@angular/core';
import { PostComponent } from './post/post';

@Component({
  selector: 'app-posts',
  imports: [PostComponent],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class PostsComponent {
  posts = input<any[]>([]);
}
