import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { WidgetComponent } from './widget/widget.component';
import { HeaderComponent } from './header/header.component';

//Decalartion of routes to the components
const routes: Routes = [
  { path: '', component: WidgetComponent },
  { path: 'disclaimer', component: DisclaimerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
