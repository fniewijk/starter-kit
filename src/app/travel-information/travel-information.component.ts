import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TravelInformationService } from './travel-information.service';

@Component({
  selector: 'app-travel-information',
  templateUrl: './travel-information.component.html',
  styleUrls: ['./travel-information.component.scss']
})
export class TravelInformationComponent {
  // TODO: Set travelInformation type.
  travelInformation: any;
  isLoading: boolean;
  travelInformationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private travelInformationService: TravelInformationService) {
    this.createForm();
  }

  onFormPost() {
    this.isLoading = true;
    this.travelInformationService
      .getTravelInformation(this.travelInformationForm.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((travelInformation: string) => {
        this.travelInformation = travelInformation;
      });
  }

  private createForm() {
    this.travelInformationForm = this.formBuilder.group({
      startStation: ['', Validators.required],
      date: ['', Validators.required],
      remember: true
    });
  }
}
