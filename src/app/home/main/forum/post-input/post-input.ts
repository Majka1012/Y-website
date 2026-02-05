import { Component, ElementRef, HostListener, input, ViewChild } from '@angular/core';
import { EmojiPicker } from '../emoji-picker/emoji-picker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-input',
  imports: [],
  templateUrl: './post-input.html',
  styleUrl: './post-input.css',
})
export class PostInput {}
