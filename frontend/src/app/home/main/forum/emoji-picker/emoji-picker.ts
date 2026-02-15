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
  cancelOut = output<void>();
  pickedEmoji = output<string>();

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

  onPickedEmoji(event: any) {
    // console.log(typeof event.detail.unicode);
    // console.log(typeof event);
    this.pickedEmoji.emit(event.detail.unicode);
  }
  cancel() {
    this.cancelOut.emit();
  }
}
