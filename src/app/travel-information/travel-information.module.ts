import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { TravelInformationRoutingModule } from './travel-information-routing.module';
import { TravelInformationComponent } from './travel-information.component';
import { TravelInformationService } from './travel-information.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    NgbModule,
    TravelInformationRoutingModule
  ],
  declarations: [TravelInformationComponent],
  providers: [TravelInformationService]
})
export class TravelInformationModule {}
