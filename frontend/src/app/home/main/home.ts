import { Component } from '@angular/core';
import { NewsComponent } from '../../news/news';
import { ForumComponent } from './forum/forum';
@Component({
  selector: 'app-home',
  imports: [NewsComponent, ForumComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {}
