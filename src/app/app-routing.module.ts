import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MonitoringComponent } from './monitoring/monitoring.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'monitoring', component: MonitoringComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
