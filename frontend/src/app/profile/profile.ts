import { Component } from '@angular/core';
import { NewsComponent } from '../news/news';
@Component({
  selector: 'app-profile',
  imports: [NewsComponent],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent {}
