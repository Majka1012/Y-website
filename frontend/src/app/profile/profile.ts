import { Component, OnInit, signal } from '@angular/core';
import { UserPosts } from './user-posts/user-posts';
import { NewsComponent } from '../news/news';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserInfo } from '../models/userInfo.model';
import { EditProfile } from './edit-profile/edit-profile';
@Component({
  selector: 'app-profile',
  imports: [NewsComponent, UserPosts, EditProfile],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent implements OnInit {
  userHandle = signal<string>('');
  userData = signal<UserInfo | null>(null);
  postAmount = signal<number>(0);
  isEdited = false;

  userReactions: 'Posts' | 'Replies' | 'Likes' | 'Bookmarked';
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
    this.userReactions = 'Posts';
  }

  ngOnInit() {
    // Wuwaj wycigamy handle z url
    this.route.paramMap.subscribe((params) => {
      const handle = params.get('handle');
      if (handle) {
        this.userHandle.set(handle);
        this.userService.getUser(handle).subscribe((data) => {
          this.userData.set(data);
        });
        // this.userService.getUserPosts(this.userHandle()).subscribe((data) => {
        //   this.userData = data;
        // });
      }
    });
  }
  changeUserReactions(typeReaction: typeof this.userReactions) {
    console.log(typeof this.userReactions);
    this.userReactions = typeReaction;
  }
  onPostsAmountChange(pAmount: number) {
    this.postAmount.set(pAmount);
  }
  onEditProfile() {
    this.isEdited = true;
  }
  closing() {
    this.isEdited = false;
  }
}
