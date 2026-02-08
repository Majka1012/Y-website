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
import { PostService } from '../../../../services/post.service';

@Component({
  selector: 'app-post-input',
  imports: [EmojiPicker, FormsModule],
  templateUrl: './post-input.html',
  styleUrl: './post-input.css',
})
export class PostInput {
  text = '';
  showEmojiPicker = false;

  lat?: number;
  lng?: number;

  constructor(private postService: PostService) {}

  onEmojiPicked(emoji: string) {
    this.text += emoji;
  }

  onLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;

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

  posting = output<void>();

  onPost() {
    if (!this.text.trim()) {
      alert('Write something!');
      return;
    }

    const postData = {
      text: this.text,
      location: {
        lat: this.lat,
        lng: this.lng,
      },
    };

    this.postService.createPost(postData).subscribe({
      next: () => {
        this.text = '';
        this.posting.emit();
      },
    });
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
