import { Injectable } from '@angular/core';
import { Observable, TeardownLogic } from 'rxjs';
import { IRental, Rental } from './rental.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private rentalURL = 'http://localhost:8080/api/v1/rentals';

  constructor(
    private http: HttpClient,
  ) {/** NOP */}

  public getRentalById(rentalId: string): Observable<IRental> {
    return this.http.get(`${this.rentalURL}/${rentalId}`) as Observable<IRental>;
  }

  public getRentals = (): Observable<IRental[]> => {
    return this.http.get(this.rentalURL) as Observable<IRental[]>;
  }
}
