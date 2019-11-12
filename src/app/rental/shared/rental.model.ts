export interface IRental {
    _id?: number;
    title: string;
    city: string;
    street: string;
    category: string;
    image: string;
    bedrooms: 3;
    description: string;
    dailyRate: 34;
    shared: false;
    createdAt: string;
}

export class Rental implements IRental {
    _id: number;
    title: string;
    city: string;
    street: string;
    category: string;
    image: string;
    bedrooms: 3;
    description: string;
    dailyRate: 34;
    shared: false;
    createdAt: string;

    constructor(data?: IRental, _id?: number) {
        if (data) {
            this._id = _id || 0;
            this.title = data.title;
            this.city = data.city;
            this.street = data.street;
            this.category = data.category;
            this.image = data.image;
            this.bedrooms = data.bedrooms;
            this.description = data.description;
            this.dailyRate = data.dailyRate;
            this.shared = data.shared;
            this.createdAt = data.createdAt;
        }
    }
}
