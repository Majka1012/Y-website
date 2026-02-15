import { Component, signal } from '@angular/core';
import { UserPosts } from './user-posts/user-posts';
import { NewsComponent } from '../news/news';
import { ActivatedRoute, RouterLink } from '@angular/router';
@Component({
  selector: 'app-profile',
  imports: [NewsComponent, UserPosts, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent {
  userHandle = signal<string>('');

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const handle = params.get('handle');
      if (handle) {
        this.userHandle.set(handle);
      }
    });
  }
}
