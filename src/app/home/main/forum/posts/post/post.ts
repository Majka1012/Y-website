import { Component, input } from '@angular/core';
import { postInterface } from '../post.model';
@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class Post {
  postConent = input.required<postInterface>();
}
