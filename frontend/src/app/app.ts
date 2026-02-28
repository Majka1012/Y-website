import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header';
import { RouterOutlet } from '@angular/router';
import { NewsComponent } from './news/news';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, NewsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Y-Site');
}
