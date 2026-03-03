import { Component, CUSTOM_ELEMENTS_SCHEMA, output } from '@angular/core';
import 'emoji-picker-element';
@Component({
  selector: 'app-emoji-picker',
  imports: [],
  templateUrl: './emoji-picker.html',
  styleUrl: './emoji-picker.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmojiPickerComponent {
  pickedEmoji = output<string>();

  // There could be added stop progagation method to prevent closing the emoji picker when clicking on it. Bot for reference I leave it like that.

  onPickedEmoji(event: any) {
    this.pickedEmoji.emit(event.detail.unicode);
  }
}

// 'emoji-click' -> event.detail
//   {
//   "emoji": {
//     "annotation": "grinning face",
//     "group": 0,
//     "order": 1,
//     "shortcodes": [ "grinning_face", "grinning" ],
//     "tags": [ "face", "grin" ],
//     "unicode": "😀",
//     "version": 1,
//     "emoticon": ":D"
//   },
//   "skinTone": 0,
//   "unicode": "😀"
// }
