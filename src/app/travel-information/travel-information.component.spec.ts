import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { of } from 'rxjs';

import { TravelInformationComponent } from './travel-information.component';
import { TravelInformationService } from './travel-information.service';

const mockTravelInformation = [
  {
    direction: 'Amersfoort Schothorst',
    routeStations: [
      {
        mediumName: 'Amersfoort'
      }
    ]
  },
  {
    direction: 'Leeuwarden',
    routeStations: [
      {
        mediumName: 'Heerenveen'
      },
      {
        mediumName: 'Zwolle'
      }
    ]
  },
  {
    direction: 'Amsterdam',
    routeStations: [
      {
        mediumName: 'Hilversum'
      },
      {
        mediumName: 'Mars'
      },
      {
        mediumName: 'Polestar'
      }
    ]
  }
];

class TravelInformationServiceSpy {
  getTravelInformation() {
    return of(JSON.stringify(mockTravelInformation));
  }
}

describe('TravelInformationComponent', () => {
  let component: TravelInformationComponent;
  let fixture: ComponentFixture<TravelInformationComponent>;
  let travelInformationServiceSpy: TravelInformationServiceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        SharedModule,
        HttpClientTestingModule,
        NgbModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule
      ],
      declarations: [TravelInformationComponent],
      providers: [
        {
          provide: TravelInformationService,
          useClass: TravelInformationServiceSpy
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelInformationComponent);
    component = fixture.componentInstance;
    travelInformationServiceSpy = fixture.debugElement.injector.get(TravelInformationService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a disabled submit button when inputs are wrong', () => {
    const submitButton = fixture.nativeElement.querySelector('.travel-information__submit-button');
    expect(submitButton.disabled).toEqual(true);
  });

  it('should do a call to the service when form filled out and set the state', () => {
    const stationInput = fixture.nativeElement.querySelector('.travel-information__start-station');
    stationInput.value = 'UT';
    const dateInput = fixture.nativeElement.querySelector('.travel-information__date');
    dateInput.value = '2019-01-01';

    const spy = spyOn(travelInformationServiceSpy, 'getTravelInformation').and.returnValue(of(mockTravelInformation));

    component.onFormPost();

    fixture.detectChanges();
    expect(component.travelInformation).toEqual(mockTravelInformation);
    expect(spy.calls.count()).toEqual(1);
  });

  it('should display a list of departures with stations', () => {
    component.travelInformation = mockTravelInformation;
    fixture.detectChanges();

    const departureList = fixture.debugElement.query(By.css('.travel-information__departure-list'));
    expect(departureList).toBeTruthy();

    const routeListItem = fixture.nativeElement.querySelector('.travel-information__departure-list-item-header');
    expect(routeListItem.textContent).toBe(mockTravelInformation[0].direction);

    const departureListItems = fixture.debugElement.queryAll(By.css('.travel-information__departure-list-item'));
    expect(departureListItems.length).toBe(mockTravelInformation.length);

    const routeListItems = fixture.debugElement.queryAll(By.css('.travel-information__route-list-item'));
    expect(routeListItems.length).toBe(6);
  });
});
