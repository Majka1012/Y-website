import { Component, input, output, signal } from '@angular/core';
import { UserInfo } from '../../models/userInfo.model';
import { FormField, form } from '@angular/forms/signals';
import { UserService } from '../../services/user.service';
interface EditProfileData {
  userName: string;
  bio: string;
}
@Component({
  selector: 'app-edit-profile',
  imports: [FormField],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile {
  cancel = output<void>();
  updatedUser = output<UserInfo>();
  userData = input.required<UserInfo>();
  editProfile = signal<EditProfileData>({
    userName: '',
    bio: '',
  });
  editForm = form(this.editProfile);
  ngOnInit() {
    this.editProfile.set({
      userName: this.userData().userName,
      bio: this.userData().bio,
    });
  }
  constructor(private userService: UserService) {}
  onCancel() {
    this.cancel.emit();
  }
  noCancel(event: MouseEvent) {
    // This is used so when you click outside of the form, it will close,
    //  but when you click inside the form, it won't close
    event.stopPropagation();
  }
  onSubmit(event: Event) {
    event.preventDefault();
    this.userService
      .updateUser(this.userData().userHandle, this.editForm().value())
      .subscribe((updatedUser) => {
        // console.log('User updated:', updatedUser);
        this.updatedUser.emit(updatedUser);
        this.cancel.emit();
      });
  }
}
