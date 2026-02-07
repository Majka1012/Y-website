import {
  Component,
  ElementRef,
  HostListener,
  input,
  OnInit,
  output,
  ViewChild,
} from '@angular/core';
import { EmojiPicker } from '../emoji-picker/emoji-picker';
import { FormsModule } from '@angular/forms';
import { postInterface } from '../posts/post.model';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-post-input',
  imports: [EmojiPicker, FormsModule],
  templateUrl: './post-input.html',
  styleUrl: './post-input.css',
})
export class PostInput {
  text = '';
  showEmojiPicker = false;
  date: Date;

  lat = 0;
  lng = 0;

  constructor() {
    this.date = new Date();
  }

  onEmojiPicked(emoji: string) {
    this.text += emoji;
  }

  onLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            console.log(position.coords);
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            this.text += 'Latitude: ' + this.lat + 'Longitude: ' + this.lng;
            //AIzaSyAY2p8N665quHo0a0pwwO0_RVhXZBD943Q
          }
        },
        (error) => {
          console.log(error);
        },
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
  posting = output<postInterface>();
  onPost() {
    const post: postInterface = {
      id: crypto.randomUUID(),
      imgSrc: '',
      text: this.text,
      time: this.date,
      location: { lat: this.lat, lng: this.lng },
    };
    if (this.text) {
      this.posting.emit(post);
      // console.log(this.text);
      this.text = '';
    } else {
      alert('You have to write something to post it!');
    }
  }

  @ViewChild('emojiContainer') emojiContainer!: ElementRef;

  emojiSelector(event: Event) {
    event.stopPropagation();
    this.showEmojiPicker = true;
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.showEmojiPicker) return;

    const clickedInside = this.emojiContainer?.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.showEmojiPicker = false;
    }
  }
}
