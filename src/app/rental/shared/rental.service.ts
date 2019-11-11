import { Injectable } from '@angular/core';
import { Observable, TeardownLogic } from 'rxjs';
import { IRental, Rental } from './rental.model';

const rentalMock: IRental = {
  title: 'Central Apartment',
  city: 'Bat Yam',
  street: 'Balfor',
  category: 'apartment',
  image: 'http://via.placeholder.com/350x250',
  bedrooms: 3,
  description: 'Nice apartment',
  dailyRate: 34,
  shared: false,
  createdAt: '11/11/2019',
};

const mockRentalsList = [1, 2, 3 , 4, 5, 6];

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private rentals: IRental[] = mockRentalsList.map(
    (n: number) => {
       return new Rental(rentalMock, n);
    }
  );

  public getRentalById(rentalId: string): Observable<IRental> {
    return new Observable<IRental>((observer): TeardownLogic => {
      setTimeout(() => {
        const foundRental = this.rentals.find(r => `${r.id}` === rentalId);
        observer.next(foundRental);
      }, 1000);
    });
  }

  public getRentals = (): Observable<IRental[]> => {
    const rentalObservable = new Observable<IRental[]>(
      (observer): TeardownLogic => {
        setTimeout(() => {
          observer.next([...this.rentals]);
        }, 1000);
    });
    return rentalObservable;
  }
}
