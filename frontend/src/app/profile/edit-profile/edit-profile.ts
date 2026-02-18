import { Component, output } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  imports: [],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile {
  cancel = output<void>();

  onCancel() {
    this.cancel.emit();
  }
  noCancel(event: MouseEvent) {
    event.stopPropagation();
  }
}
