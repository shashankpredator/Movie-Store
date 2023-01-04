import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ParentComponent } from './parent/parent.component';
import { ViewComponent } from './view/view.component';
import { GenerComponent } from './gener/gener.component';
const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  {path:'',component:ParentComponent},
  {path:'View',component:ViewComponent},
  {path:'Gener',component:GenerComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
