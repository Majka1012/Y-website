export interface UserInfo {
  userName: string;
  userHandle: string;
  email: string;
  password: string;
  bio: string;
  avatarUrl: string;

  followersCount?: Number;

  followingCount?: Number;
  followers?: any;

  following?: any;
  bookmarkedPosts?: any;

  likedPosts?: any;
}
