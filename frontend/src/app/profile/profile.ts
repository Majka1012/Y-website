import { Component, OnInit, signal } from '@angular/core';
import { UserPosts } from './user-posts/user-posts';
import { NewsComponent } from '../news/news';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../services/post.service';
import { postInterface } from '../models/post.model';
@Component({
  selector: 'app-profile',
  imports: [NewsComponent, UserPosts],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent implements OnInit {
  userHandle = signal<string>('');
  userData?: postInterface[];
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const handle = params.get('handle');
      if (handle) {
        this.userHandle.set(handle);
        this.postService.getUserPosts(this.userHandle()).subscribe((data) => {
          this.userData = data;
          console.log(data);
        });
      }
    });
  }
}
