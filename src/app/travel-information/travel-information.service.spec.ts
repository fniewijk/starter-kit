import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CoreModule, HttpCacheService } from '@app/core';
import { TravelInformationService } from './travel-information.service';

describe('TravelInformationService', () => {
  let travelInformationService: TravelInformationService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, HttpClientTestingModule],
      providers: [HttpCacheService, TravelInformationService]
    });
  }));

  beforeEach(inject(
    [HttpCacheService, TravelInformationService, HttpTestingController],
    (
      htttpCacheService: HttpCacheService,
      _travelInformationService: TravelInformationService,
      _httpMock: HttpTestingController
    ) => {
      travelInformationService = _travelInformationService;
      httpMock = _httpMock;

      htttpCacheService.cleanCache();
    }
  ));

  afterEach(() => {
    httpMock.verify();
  });

  describe('getTravelInformation', () => {
    it('should return travel information', () => {
      // Arrange
      const mockTravelInformation = { payload: { departures: ['bla'] } };

      // Act
      const travelInformationSubscription = travelInformationService.getTravelInformation({
        date: '2019-04-05',
        startStation: 'UT'
      });

      // Assert
      travelInformationSubscription.subscribe((quote: string) => {
        expect(quote).toEqual(mockTravelInformation.payload.departures);
      });
      httpMock.expectOne({}).flush(mockTravelInformation);
    });

    it('should return a string in case of error', () => {
      // Act
      const travelInformationSubscription = travelInformationService.getTravelInformation({
        date: '2019-04-05',
        startStation: 'UT'
      });

      // Assert
      travelInformationSubscription.subscribe((quote: string) => {
        expect(typeof quote).toEqual('string');
        expect(quote).toContain('Error');
      });
      httpMock.expectOne({}).flush(null, {
        status: 500,
        statusText: 'error'
      });
    });
  });
});
