import { Component, inject, input, output } from '@angular/core';
import { postInterface } from '../../../../../models/post.model';
import { DatePipe } from '@angular/common';
import { PostService } from '../../../../../services/post.service';
@Component({
  selector: 'app-post',
  imports: [DatePipe],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class Post {
  postContent = input.required<postInterface>();
  likes = 0;
  isPostLiked = false;
  isBookmarked = false;
  private postService = inject(PostService);
  onLiked() {
    const newLikedState = !this.isPostLiked;
    this.isPostLiked = newLikedState;

    this.postService.toggleLike(this.postContent()._id!, newLikedState).subscribe({
      next: (updatedPost) => {
        const currentPost = this.postContent();
        currentPost.likes = updatedPost.likes;
      },
      error: (error) => {
        console.error('Błąd likowania:', error);
        this.isPostLiked = !newLikedState;
      },
    });
  }
  onBookmarked() {
    if (!this.isBookmarked) {
      this.isBookmarked = true;
    } else {
      this.isBookmarked = false;
    }
  }
}
