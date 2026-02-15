import { Routes } from '@angular/router';
import { HomeComponent } from './home/main/home';
import { ChatComponent } from './chat/chat';
import { ProfileComponent } from './profile/profile';
import { NotificationsComponent } from './notifications/notifications';
export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
