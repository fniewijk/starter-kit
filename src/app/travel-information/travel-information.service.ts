import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  travelInformation: (c: TravelInformationContext) => `/travel-information-api?station=${c.startStation}&date=${c.date}`
};

export interface RouteStationsInterface {
  mediumName: string;
}

export interface DepartureInterface {
  direction: string;
  routeStations: RouteStationsInterface[];
}

export interface TravelInformationInterface {
  payload: {
    departures: DepartureInterface[];
  };
}
// [?dateTime][&maxJourneys][&lang][&station][&uicCode][&source]
export interface TravelInformationContext {
  startStation: string;
  date: string;
}

@Injectable()
export class TravelInformationService {
  constructor(private httpClient: HttpClient) {}

  getTravelInformation(context: TravelInformationContext): Observable<string> {
    return this.httpClient
      .cache()
      .get(routes.travelInformation(context))
      .pipe(
        map((body: any) => body.payload.departures),
        catchError(() => of('Error, could not load travel information'))
      );
  }
}
