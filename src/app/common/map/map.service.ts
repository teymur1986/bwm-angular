import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private geoCoder;

  constructor() { }

  public geocodeLocation(address: string): Observable<{ lat: number, lng: number }> {
    this.geoCoder = new (<any>window).google.maps.Geocoder();
    return new Observable((observer) => {
      this.geoCoder.geocode({ address }, (result, status) => {
        const locationIndex = 0;
        if (status === 'OK') {
          const geometry = result[locationIndex].geometry.location;
          observer.next({ lat: geometry.lat(), lng: geometry.lng() });
        } else {
          observer.error('Location cannot be geo coded.');
        }
      });
    });
  }
}
