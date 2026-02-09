import { Component, ElementRef, HostListener, output, ViewChild } from '@angular/core';
import { EmojiPicker } from '../emoji-picker/emoji-picker';
import { FormsModule } from '@angular/forms';
import { postInterface } from '../../../../models/post.model';
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
  img = '';
  lat = 0;
  lng = 0;

  constructor(private postService: PostService) {}

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

  currentUser = {
    id: 'majkakakak',
    username: 'Maja A',
    handle: '@maja_dev',
    avatarUrl: 'userIcon.png',
  };

  posting = output<void>();

  onPost() {
    if (!this.text.trim()) {
      alert('Write something!');
      return;
    }

    const postData: postInterface = {
      text: this.text,
      imgSrc: this.img,
      user: this.currentUser,
      location: { lat: this.lat, lng: this.lng },
    };

    this.postService.createPost(postData).subscribe({
      next: () => {
        this.text = '';
        this.posting.emit();
      },
    });
  }

  onEmojiPicked(emoji: string) {
    this.text += emoji;
    setTimeout(() => {
      const textarea = document.getElementById('inputPost') as HTMLTextAreaElement;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }
    }, 0);
  }

  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
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
