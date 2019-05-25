export interface IAddress {
  id?: number;
  streetName?: string;
  apartmentOrHouseNumber?: string;
  city?: string;
  zipcode?: number;
  state?: string;
  country?: string;
}

export class Address implements IAddress {
  constructor(
    public id?: number,
    public streetName?: string,
    public apartmentOrHouseNumber?: string,
    public city?: string,
    public zipcode?: number,
    public state?: string,
    public country?: string
  ) {}
}
