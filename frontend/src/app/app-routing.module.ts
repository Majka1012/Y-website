import { Routes } from '@angular/router';
import { HomeComponent } from './home/main/home';
import { ChatComponent } from './chat/chat';
import { ProfileComponent } from './profile/profile';
import { NotificationsComponent } from './notifications/notifications';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'profile/:handle', component: ProfileComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
];
