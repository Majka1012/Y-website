import { Component, ElementRef, HostListener, input, ViewChild } from '@angular/core';
import { EmojiPicker } from '../emoji-picker/emoji-picker';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-post-input',
  imports: [EmojiPicker, FormsModule],
  templateUrl: './post-input.html',
  styleUrl: './post-input.css',
})
export class PostInput {
  text = '';
  showEmojiPicker = false;
  onEmojiPicked(emoji: string) {
    this.text += emoji;
    // console.log(this.text);
  }
  lat = 0;
  lng = 0;

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

  @ViewChild('emojiContainer') emojiContainer!: ElementRef;

  emojiSelector(event: MouseEvent) {
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
