import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { skipWhile, take } from 'rxjs';

const routes: Routes = [
  {
    path: 'inbox',
    canMatch: [
      () => inject(AuthService).signedIn$.pipe(
        skipWhile(value => value === null),
        take(1)
      )
    ],
    loadChildren: () => import('./inbox/inbox.module').then(mod => mod.InboxModule)
  },
  {
    path: 'inbox',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
