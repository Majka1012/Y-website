import { Component, input } from '@angular/core';
import { postInterface } from '../../../../../models/post.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-post',
  imports: [DatePipe],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class Post {
  postConent = input.required<postInterface>();

  likes = 0;
  isPostLiked = false;
  isBookmarked = false;

  onLiked() {
    if (!this.isPostLiked) {
      this.likes++;
      this.isPostLiked = true;
    } else {
      this.likes--;
      this.isPostLiked = false;
    }
  }
  onBookmarked() {
    if (!this.isBookmarked) {
      this.isBookmarked = true;
    } else {
      this.isBookmarked = false;
    }
  }
}
