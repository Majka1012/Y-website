import { Component } from '@angular/core';
import { PostsComponent } from './posts/posts';
import { PostInputComponent } from './post-input/post-input';
import { PostService } from '../../../services/post.service';
import { postInterface } from '../../../models/post.model';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [PostsComponent, PostInputComponent],
  templateUrl: './forum.html',
  styleUrl: './forum.css',
})
export class ForumComponent implements OnInit {
  posts: postInterface[] = [];

  constructor(private postService: PostService) {}
  ngOnInit() {
    this.loadPosts();
  }
  loadPosts() {
    this.postService.getPosts().subscribe((data) => {
      this.posts = data;
      for (const post of this.posts) {
        console.log(post);
      }
    });
  }

  onPostAdded() {
    this.loadPosts();
  }
}
