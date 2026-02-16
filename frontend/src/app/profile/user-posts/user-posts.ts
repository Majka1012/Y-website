import { Component, input, OnInit, output, signal } from '@angular/core';
import { PostService } from '../../services/post.service';
import { postInterface } from '../../models/post.model';
import { PostComponent } from '../../home/main/forum/posts/post/post';
@Component({
  selector: 'app-user-posts',
  imports: [PostComponent],
  templateUrl: './user-posts.html',
  styleUrl: './user-posts.css',
})
export class UserPosts implements OnInit {
  constructor(private postService: PostService) {}
  posts = signal<postInterface[]>([]);
  postsAmount = output<number>();
  userHandle = input.required<string>();
  ngOnInit() {
    this.loadPosts();
  }
  loadPosts() {
    // console.log('USER HANDLE' + this.userHandle());
    this.postService.getUserPosts(this.userHandle()).subscribe((data) => {
      this.posts.set(data);
      this.postsAmount.emit(data.length);
    });
  }
}
