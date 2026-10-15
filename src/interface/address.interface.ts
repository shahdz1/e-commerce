export interface IAddress {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface IAddressResponse {
  data: IAddress[];
  status: string;
  message?: string;
  statusMsg?: string;
}
