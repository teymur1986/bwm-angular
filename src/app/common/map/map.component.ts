import { Component, OnInit, Input } from '@angular/core';
import { MapService } from './map.service';

@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() location: string;

  lat: number;
  lng: number;

  constructor(
    private mapService: MapService,
  ) {/** NOP */}

  ngOnInit() {
  }

  mapReadyHandler() {
    this.mapService.geocodeLocation(this.location)
    .subscribe(
      coordinates => {
        const {lat = 0, lng = 0} = coordinates;
        this.lat = lat;
        this.lng = lng;
      },
      error => console.log(error),
    );
  }

}
