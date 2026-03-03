import { Component, ElementRef, HostListener, output, ViewChild } from '@angular/core';
import { EmojiPickerComponent } from '../emoji-picker/emoji-picker';
import { FormsModule } from '@angular/forms';
import { postInterface } from '../../../../models/post.model';
import { PostService } from '../../../../services/post.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-post-input',
  imports: [EmojiPickerComponent, FormsModule],
  templateUrl: './post-input.html',
  styleUrl: './post-input.css',
})
export class PostInputComponent {
  text = '';
  showEmojiPicker = false;
  img = '';
  lat: number | null = null;
  lng: number | null = null;
  file?: File | null = null;

  constructor(
    private postService: PostService,
    private http: HttpClient,
  ) {}

  onLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
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
    avatarUrl: 'userIcon.png',
    userName: 'Jane Smith',
    userHandle: 'janesmith',
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
      user: {
        avatarUrl: this.currentUser.avatarUrl,
        userName: this.currentUser.userName,
        userHandle: this.currentUser.userHandle,
      },
    };
    if (this.lat && this.lng) {
      this.http.get(`http://localhost:3000/api/geocode?lat=${this.lat}&lng=${this.lng}`).subscribe({
        next: (response: any) => {
          postData.address = response.address;
          // console.log('ADRES ' + postData.address);
          this.savePost(postData);
          console.log(postData);
        },
        error: (error) => {
          console.error('Błąd pobierania adresu:', error);
          this.savePost(postData);
        },
      });
    } else {
      ``;
      this.savePost(postData);
    }

    // this.postService.createPost(postData).subscribe({
    //   next: () => {
    //     this.text = '';
    //     this.posting.emit();
    //   },
    // });
  }
  savePost(postData: postInterface) {
    // console.log('Saving post with user:', postData.user);
    this.postService.createPost(postData).subscribe({
      next: () => {
        console.log('Post saved successfully!');
        this.text = '';
        this.img = '';
        this.lat = null;
        this.lng = null;
        this.posting.emit();
      },
      error: (error) => {
        console.error('Błąd tworzenia posta:', error);
        alert('Nie udało się utworzyć posta');
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    // console.log('Selected file:', file);
  }
}
