import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CamelizePipe } from 'ngx-pipes';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private geoCoder;
  private locationCache: any = {};

  constructor(
    private camelisePipe: CamelizePipe,
  ) {/** NOP */}

  private cacheLocation(location: string, coordinates: any) {
    const cl = this.camelisePipe.transform(location);
    this.locationCache[cl] = coordinates;
  }

  private isLocationCached(location: string): { lat: number, lng: number } {
    return this.locationCache[this.camelisePipe.transform(location)];
  }

  public getGeoLocation(address: string): Observable<{ lat: number, lng: number }> {
    if (!this.geoCoder) {
      this.geoCoder = new (<any>window).google.maps.Geocoder();
    }
    return new Observable((observer) => {

      const foundCachedLocation = this.isLocationCached(address);
      if (foundCachedLocation) {
        return observer.next(foundCachedLocation);
      }

      this.geoCoder.geocode({ address }, (result, status) => {
        const locationIndex = 0;
        if (status === 'OK') {
          const geometry = result[locationIndex].geometry.location;
          const coordinates = { lat: geometry.lat(), lng: geometry.lng() };
          this.cacheLocation(address, coordinates);
          observer.next(coordinates);
        } else {
          observer.error('Location cannot be geo coded.');
        }
      });
    });
  }
}
