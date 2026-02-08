import { Component, input } from '@angular/core';
import { PostService } from '../../../../services/post.service';
import { Post } from './post/post';

@Component({
  selector: 'app-posts',
  imports: [Post],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {
  posts: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (err) => {
        console.log('Error loading posts:', err);
      },
    });
  }
}
