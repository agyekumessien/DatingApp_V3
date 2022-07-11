import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './_Helpers/Errors/not-found/not-found.component';
import { ServerErrorComponent } from './_Helpers/Errors/server-error/server-error.component';
import { TestErrorsComponent } from './_Helpers/Errors/test-errors/test-errors.component';
import { AuthGuard } from './_Helpers/Guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_Helpers/Guards/prevent-unsaved-changes.guard';
import { MemberDetailedResolver } from './_Resolvers/member-detailed.resolvers';
import { HomeComponent } from './_View/home/home.component';
import { ListsComponent } from './_View/lists/lists.component';
import { MemberDetailComponent } from './_View/members/member-detail/member-detail.component';
import { MemberEditComponent } from './_View/members/member-edit/member-edit.component';
import { MemberListComponent } from './_View/members/member-list/member-list.component';
import { MessagesComponent } from './_View/messages/messages.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent},
      {path: 'members/:username', component: MemberDetailComponent, resolve: {member: MemberDetailedResolver}},
      {path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'lists', component: ListsComponent},
      {path: 'messages', component: MessagesComponent},
    ]
  },
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
