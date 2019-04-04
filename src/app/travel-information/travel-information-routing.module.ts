import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { TravelInformationComponent } from './travel-information.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/travel-information', pathMatch: 'full' },
    { path: 'travel-information', component: TravelInformationComponent, data: { title: extract('TravelInformation') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TravelInformationRoutingModule {}
