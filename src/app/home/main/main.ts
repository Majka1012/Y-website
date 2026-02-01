import { Component } from '@angular/core';
import { News } from './news/news';
import { Forum } from './forum/forum';
@Component({
  selector: 'app-main',
  imports: [News, Forum],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {}
