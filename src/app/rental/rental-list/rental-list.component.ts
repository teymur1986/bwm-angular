import { Component, OnInit } from '@angular/core';
import { RentalService } from '../shared/rental.service';
import { IRental } from '../shared/rental.model';

@Component({
  selector: 'bwm-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss'],
})
export class RentalListComponent implements OnInit {

  rentals: IRental[] = [];

  constructor(
    private rentalService: RentalService,
  ) {/** NOP */}

  ngOnInit() {
    const rentalObservable = this.rentalService.getRentals();
    rentalObservable.subscribe(
      (rentals: IRental[]) => {
        this.rentals = rentals;
      },
      (error: Error) => {
        console.log(error);
      },
      () => {
        console.log('Completed.');
      },
    );
  }

}
