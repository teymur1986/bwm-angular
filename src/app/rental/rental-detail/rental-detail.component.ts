import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { IRental, Rental } from '../shared/rental.model';

@Component({
  selector: 'bwm-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit {

  rental: IRental;

  constructor(
    private ar: ActivatedRoute,
    private rentalService: RentalService,
  ) {/** NOP */}

  ngOnInit() {
    this.ar.params.subscribe(
      (params) => {
        const rentalId = params['rentalId'];
        this.getRentalById(rentalId);
      }
    );
  }

  getRentalById = (rentalId: string) => {
    this.rentalService.getRentalById(rentalId)
    .subscribe(
      (rental: IRental) => {
        this.rental = rental;
      }
    );
  }

}
