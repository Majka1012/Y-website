import { Component, signal } from '@angular/core';
import { Header } from './header/header';
import { Main } from './home/main/main';
@Component({
  selector: 'app-root',
  imports: [Header, Main],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Y-Site');
}
