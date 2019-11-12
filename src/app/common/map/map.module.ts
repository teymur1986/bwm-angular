import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { CamelizePipe } from 'ngx-pipes';
import { MapComponent } from './map.component';
import { MapService } from './map.service';

@NgModule({
  declarations: [
    MapComponent,
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBKzkg_FmkT8JA9cpMkUf0lsNMcI_cDZ2Y',
    }),
  ],
  exports: [
    MapComponent,
  ],
  providers: [
    CamelizePipe,
    MapService,
  ]
})
export class MapModule { }
