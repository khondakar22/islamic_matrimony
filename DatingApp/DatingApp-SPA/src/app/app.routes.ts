import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './member-list/member-list.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from './guards/auth.guard';
export const appRoutes: Routes = [
  { path: '', component: HomeComponent},

  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'messages', component: MessagesComponent},
      { path: 'lists', component: ListComponent},
      { path: 'members', component: MemberListComponent}
    ]
  },

  { path: '**', redirectTo: '', pathMatch: 'full'},
];
