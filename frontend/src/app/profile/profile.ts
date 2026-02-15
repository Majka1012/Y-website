import { Component } from '@angular/core';
import { UserPosts } from './user-posts/user-posts';
import { NewsComponent } from '../news/news';
@Component({
  selector: 'app-profile',
  imports: [NewsComponent, UserPosts],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent {}
