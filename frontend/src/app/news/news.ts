import { HttpClient } from '@angular/common/http';
import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  imports: [],
  templateUrl: './news.html',
  styleUrl: './news.css',
})
export class NewsComponent implements OnInit {
  constructor(private http: HttpClient) {}

  location = input<string>('pl');
  news?: JSON;

  ngOnInit(): void {
    this.http.get(`http://localhost:3000/api/news?country=${this.location()}`).subscribe({
      next: (response: any) => {
        this.news = response;
        console.log(this.news);
      },
      error: (error) => {
        console.error('Błąd pobierania adresu:', error);
      },
    });
  }
}
