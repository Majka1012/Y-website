import { Component, computed, inject, input, output } from '@angular/core';
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

  currentLikes = computed(() => this.postContent().likes || 0);
  localLikes = 0;
  ngOnInit() {
    this.localLikes = this.postContent().likes || 0;
  }

  onLiked() {
    const newLikedState = !this.isPostLiked;
    this.isPostLiked = newLikedState;

    this.localLikes += newLikedState ? 1 : -1;

    this.postService.toggleLike(this.postContent()._id!, newLikedState).subscribe({
      next: (updatedPost) => {
        this.localLikes = updatedPost.likes || 0;
        const currentPost = this.postContent();
        currentPost.likes = updatedPost.likes;
        // console.log('local:' + this.localLikes + ' DB: ' + currentPost.likes);
      },
      error: (error) => {
        console.error('Błąd likowania:', error);
        this.isPostLiked = !newLikedState;
        this.localLikes += newLikedState ? -1 : 1;
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
