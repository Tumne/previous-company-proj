export default interface RetailItem {
  archived: Boolean;
  bodyType: string;
  condition: string;
  completePercent: number;
  created: string;
  customersCount: number;
  cylinders: number;
  description: string;
  displacement: number;
  driveTrain: string;
  exteriorPhotos: Array<any>;
  fuelType: string;
  id: string;
  interiorColor: string;
  attributes: {
    mileage: {
      formattedAmount: string;
    };
    exteriorColor: string;
    transmission: string;
    displacement: {
      formattedAmount: string;
    };
    cylinders: number;
    fuelType: string;
  };
  leadsCount: number;
  listPrice: {
    formattedAmountRounded: string;
  };
  make: string;
  mileage: { formattedAmount: string; unit: string };
  model: string;
  numberOfDoors: number;
  numberOfPassengers: number;
  options: Array<any>;
  photos: Array<any>;
  primaryPhoto: {
    id: string;
    thumb: string;
    large: string;
    listPhoto: string;
  };
  rooftop: { city: string; name: string; regionCode: string };
  status: string;
  stockNumber: number;
  testDrivesCount: number;
  transmission: string;
  trim: string;
  updated: string;
  vin: string;
  year: number;
  tags: { id: string; name: string; group: string; type: string }[];
}
