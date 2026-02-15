import { Component, input, OnInit } from '@angular/core';
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
  posts: postInterface[] = [];
  userHandle = input.required<string>();
  ngOnInit() {
    this.loadPosts();
  }
  loadPosts() {
    // console.log('USER HANDLE' + this.userHandle());
    this.postService.getUserPosts(this.userHandle()).subscribe((data) => {
      this.posts = data;
      console.log('GET USER POST 3');
      console.log(data);
    });
  }
}
