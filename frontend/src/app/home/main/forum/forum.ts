import { Component } from '@angular/core';
import { PostsComponent } from './posts/posts';
import { PostInputComponent } from './post-input/post-input';
import { PostService } from '../../../services/post.service';
import { postInterface } from '../../../models/post.model';
import { OnInit, signal } from '@angular/core';
@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [PostsComponent, PostInputComponent],
  templateUrl: './forum.html',
  styleUrl: './forum.css',
})
export class ForumComponent implements OnInit {
  posts = signal<postInterface[]>([]);

  constructor(private postService: PostService) {}
  ngOnInit() {
    this.loadPosts();
  }
  loadPosts() {
    this.postService.getPosts().subscribe((data) => {
      this.posts.set(data);
    });
  }

  onPostAdded() {
    this.loadPosts();
  }
}
