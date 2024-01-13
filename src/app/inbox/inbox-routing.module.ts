import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { EmailShowComponent } from './email-show/email-show.component';
import { EmailService } from './email.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { EMPTY, catchError } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'not-found', component: NotFoundComponent },
      {
        path: ':id',
        component: EmailShowComponent,
        resolve: {
          email: (route: ActivatedRouteSnapshot) => {
            const router = inject(Router)
            return inject(EmailService).getEmail(route.params['id']).pipe(
              catchError(() => {
                router.navigateByUrl('/inbox/not-found');
                return EMPTY;
              })
            )
          }
        }
      },
      { path: '', component: PlaceholderComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
